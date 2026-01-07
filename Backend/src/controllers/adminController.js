import cloudinary from "../config/cloudinary.js";
import Note from "../models/Note.js";
import streamifier from "streamifier";

const ALLOWED_PATTERN = "it-2019";
import User from "../models/User.js";

export const getUserStats = async (req, res) => {
  const users = await User.find().select("email createdAt");

  res.json({
    totalUsers: users.length,
    users
  });
};

export const uploadNote = async (req, res) => {
  try {
    // multer sends file here, NOT req.files
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const { title, pattern, year, semester, subject } = req.body;

    if (!pattern || pattern !== ALLOWED_PATTERN)
      return res.status(400).json({ message: "Invalid pattern" });

    if (![1, 2, 3, 4].includes(+year))
      return res.status(400).json({ message: "Invalid year" });

    if (![1,2,3,4,5,6,7,8].includes(+semester))
      return res.status(400).json({ message: "Invalid semester" });

    if (!subject || subject.trim().length < 2)
      return res.status(400).json({ message: "Subject is required" });

    // Upload file buffer directly to Cloudinary
    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "onlynotes",
            use_filename: true,
            unique_filename: false
          },
          (error, result) => error ? reject(error) : resolve(result)
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const upload = await uploadFromBuffer();

    const note = await Note.create({
      title: title.trim(),
      pattern,
      year,
      semester,
      subject: subject.trim(),
      fileUrl: upload.secure_url,
      isPublic: true
    });

    res.json(note);
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
