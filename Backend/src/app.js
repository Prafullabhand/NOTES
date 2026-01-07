import "./loadEnv.js";             // ⬅️ ENV LOADS FIRST (ONLY PLACE)
import express from "express";
import cors from "cors";


import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(cors({
  origin: [
    "https://notes-dipsq8y4o-prafulla-bhands-projects.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/admin", adminRoutes);

export default app;
