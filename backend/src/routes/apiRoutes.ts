import express from "express";
import { 
  registerUser, 
  loginUser, 
  setup2FA, 
  verify2FA, 
  login2FA 
} from "../controllers/authController";
import { 
  getPosts,
  createPost, 
  deletePost,
  likePost
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Auth Routes
router.post("/auth/register", registerUser as any);
router.post("/auth/login", loginUser as any);
router.post("/auth/login-2fa", login2FA as any);

// Protected 2FA Management
router.post("/auth/setup-2fa", protect as any, setup2FA as any);
router.post("/auth/verify-2fa", protect as any, verify2FA as any);

// Community/Post Routes
router.get("/posts", getPosts as any);
router.post("/posts", protect as any, createPost as any);
router.post("/posts/:postId/like", protect as any, likePost as any);
router.delete("/posts/:id", protect as any, deletePost as any);

export default router;
