import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  authorName: string;
  text: string;
  group: string;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  isAnonymous: boolean;
}

const postSchema = new Schema<IPost>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true },
  text: { type: String, required: true, maxlength: 500 },
  group: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isAnonymous: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IPost>("Post", postSchema);
