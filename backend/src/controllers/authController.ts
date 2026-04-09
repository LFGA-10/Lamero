import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import User from "../models/User";
import { mockUsers } from "../config/mockDb";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "lumora_secret_123", {
    expiresIn: "30d",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken((user._id as any).toString()),
      });
    }
  } catch (error) {
    console.warn("⚠️ [Auth]: Database offline. Proceeding with mock registration.");
    const mockUser = {
      _id: `mock_u_${Date.now()}`,
      username: username || "Explorer",
      email: email,
      token: generateToken(`mock_u_${Date.now()}`)
    };
    mockUsers.push({ ...mockUser, password }); // Store password for mock login
    res.status(201).json(mockUser);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ 
        message: `Account is temporarily locked. Try again in ${Math.ceil((user.lockUntil - Date.now()) / 60000)} minutes.` 
      });
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      // Reset failed attempts
      user.loginAttempts = 0;
      user.lockUntil = 0;
      await user.save();

      // If 2FA is enabled, don't return the full token yet
      if (user.isTwoFactorEnabled) {
        return res.json({
          twoFactorRequired: true,
          userId: user._id,
          message: "2FA token required"
        });
      }

      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken((user._id as any).toString()),
      });
    } else {
      // Handle failed attempt
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 mins
      }
      await user.save();
      
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.warn("⚠️ [Auth]: Database offline. Attempting mock login.");
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    if (mockUser) {
       return res.json({
         _id: mockUser._id,
         username: mockUser.username,
         email: mockUser.email,
         token: mockUser.token
       });
    }
    // Universal dev password for mock login
    if (password === "lumora123") {
        return res.json({
          _id: "mock_default",
          username: email.split("@")[0],
          email: email,
          token: generateToken("mock_default")
        });
    }
    return res.status(401).json({ message: "Invalid email or password (Mock Mode)" });
  }
};

// 2FA Setup: Generate secret and QR code
export const setup2FA = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = speakeasy.generateSecret({ name: `Lumora (${user.email})` });
    
    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCodeData = await qrcode.toDataURL(secret.otpauth_url as string);
    
    res.json({
      qrCode: qrCodeData,
      secret: secret.base32
    });
  } catch (error) {
    res.status(500).json({ message: "Error setting up 2FA" });
  }
};

// 2FA Verify: Verify token and enable 2FA
export const verify2FA = async (req: any, res: Response) => {
  const { token } = req.body;
  
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.twoFactorSecret) return res.status(400).json({ message: "2FA not initiated" });

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token
    });

    if (verified) {
      user.isTwoFactorEnabled = true;
      await user.save();
      res.json({ message: "2FA successfully enabled" });
    } else {
      res.status(400).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying 2FA" });
  }
};

// 2FA Login: Verify token during login flow
export const login2FA = async (req: Request, res: Response) => {
  const { userId, token } = req.body;
  
  try {
    const user = await User.findById(userId);
    if (!user || !user.twoFactorSecret) return res.status(400).json({ message: "Invalid request" });

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token
    });

    if (verified) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken((user._id as any).toString()),
      });
    } else {
      res.status(400).json({ message: "Invalid 2FA token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error during 2FA login" });
  }
};
