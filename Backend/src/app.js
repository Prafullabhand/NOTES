import "./loadEnv.js";
import express from "express";

import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import adminRoutes from "./routes/admin.js";

const app = express();

/* ======= PERMANENT CORS FIX (Express 5 Safe) ======= */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
/* ================================================ */

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/admin", adminRoutes);

export default app;
