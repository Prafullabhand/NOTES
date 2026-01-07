import Note from "../models/Note.js";

/* 1️⃣ PATTERNS */
export const getPatterns = async (req,res)=>{
  res.json(await Note.distinct("pattern"));
};

/* 2️⃣ YEARS */
export const getYears = async (req,res)=>{
  res.json(await Note.find({pattern:req.params.pattern}).distinct("year"));
};

/* 3️⃣ SEMESTERS (ACADEMICALLY LOCKED) */
export const getSemesters = async (req,res)=>{
  const y = Number(req.params.year);

  const map = {
    1:[1,2], 2:[3,4], 3:[5,6], 4:[7,8]
  };

  res.json(map[y] || []);
};

/* 4️⃣ SUBJECTS */
export const getSubjects = async (req,res)=>{
  res.json(await Note.find({
    pattern:req.params.pattern,
    year:req.params.year,
    semester:req.params.semester
  }).distinct("subject"));
};

/* 5️⃣ PDFs */
export const getNotes = async (req,res)=>{
  res.json(await Note.find({
    pattern:req.params.pattern,
    year:req.params.year,
    semester:req.params.semester,
    subject:req.params.subject,
    isPublic:true
  }));
};
