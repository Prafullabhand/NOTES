import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  pattern: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true          // 🔥 FAST filtering
  },

  year: {
    type: String,
    required: true,
    index: true
  },

  semester: {
    type: String,
    required: true,
    index: true
  },

  subject: {
    type: String,
    required: true,
    trim: true,
    index: true
  },

  fileUrl: {
    type: String,
    required: true
  },

  isPublic: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

/* 🔒 Prevent duplicate uploads of same subject & semester */
NoteSchema.index(
  { pattern: 1, year: 1, semester: 1, subject: 1, title: 1 },
  { unique: true }
);

export default mongoose.model("Note", NoteSchema);
