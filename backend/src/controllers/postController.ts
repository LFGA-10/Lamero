import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Post from "../models/Post";
import { mockPosts } from "../config/mockDb";

export const createPost = async (req: AuthRequest, res: Response) => {
  const { text, group, isAnonymous } = req.body;
  
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const post = await Post.create({
      user: req.user._id,
      authorName: isAnonymous ? "Anonymous" : req.user.username,
      text,
      group,
      isAnonymous
    } as any);

    res.status(201).json(post);
  } catch (error) {
    console.warn("⚠️ [DB]: Creating mock post.");
    const mockPost = {
       _id: Date.now().toString(),
       authorName: isAnonymous ? "Anonymous" : (req.user as any).username,
       text,
       group,
       likes: 0,
       likedBy: [],
       isAnonymous,
       createdAt: new Date().toISOString()
    };
    mockPosts.unshift(mockPost);
    res.status(201).json(mockPost);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
    res.json(posts);
  } catch (error) {
    console.warn("⚠️ [DB]: Falling back to mock feed.");
    res.json(mockPosts);
  }
};

export const likePost = async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;
  
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    const isLiked = post.likedBy.includes(userId as any);

    if (isLiked) {
      post.likedBy = post.likedBy.filter(id => id.toString() !== (userId as any).toString());
      post.likes -= 1;
    } else {
      post.likedBy.push(userId as any);
      post.likes += 1;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error liking post" });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure only the author can delete
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You cannot delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};
