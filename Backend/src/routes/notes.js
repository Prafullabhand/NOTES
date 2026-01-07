import express from "express";
import {
  getPatterns,
  getYears,
  getSemesters,
  getSubjects,
  getNotes
} from "../controllers/notesController.js";

import { downloadPdf } from "../controllers/downloadController.js";

const router = express.Router();

/* =========================
   DOWNLOAD (MUST BE FIRST)
========================= */
router.get("/download/pdf", downloadPdf);

/* =========================
   API STRUCTURE
========================= */

// All patterns
router.get("/patterns", getPatterns);

// Years under a pattern
router.get("/:pattern", getYears);

// Semesters under year
router.get("/:pattern/:year", getSemesters);

// Subjects under semester
router.get("/:pattern/:year/:semester", getSubjects);

// PDFs under subject
router.get("/:pattern/:year/:semester/:subject", getNotes);

export default router;
