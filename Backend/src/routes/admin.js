import express from "express";
import upload from "../middlewares/upload.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { uploadNote, getUserStats } from "../controllers/adminController.js";

const router = express.Router();

// Upload note
router.post(
  "/upload",
  adminMiddleware,
  upload.single("file"),
  uploadNote
);

// Admin analytics
router.get("/users", adminMiddleware, getUserStats);

export default router;
