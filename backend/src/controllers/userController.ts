import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUserMood = async (req: AuthRequest, res: Response) => {
  const { mood } = req.body; // mood: { label, emoji, color }
  
  try {
    const user = await User.findById(req.user?._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.selectedMood = mood;
    // Map mood label to a numeric value for history graph
    const moodValues: Record<string, number> = {
      "Radiant": 90, "Peaceful": 70, "Reflective": 50, "Tired": 30, "Anxious": 20, "Sad": 10
    };
    
    user.moodHistory.push({
      value: moodValues[mood.label] || 50,
      date: new Date()
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating mood" });
  }
};

export const updateStreak = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.streak += 1;
    await user.save();
    res.json({ streak: user.streak });
  } catch (error) {
    res.status(500).json({ message: "Error updating streak" });
  }
};
