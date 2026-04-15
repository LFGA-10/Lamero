import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import apiRoutes from "./routes/apiRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors());
app.use(express.json());

// Rate Limiting: Prevent Brute Force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api/", limiter);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lumora";

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("🍃 Connected to Sanctuary Database (MongoDB)"))
  .catch((err) => {
    console.warn("⚠️  Local MongoDB not detected. Sanctuary is running in 'Memory/Mock Mode'.");
    if (process.env.NODE_ENV === "production") {
      console.error("❌ Critical: Database connection error in production!", err);
    }
  });

// Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Lumora Sanctuary API is Live and Secure 🛡️");
});

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("⛔ [Server Error]:", err.message);
  res.status(500).json({
    message: "Sanctuary Resonance Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Sanctuary Server running on port ${PORT}`);
});
