import http from "http";
import "./loadEnv.js";
import mongoose from "mongoose";
import app from "./app.js";

const server = http.createServer((req, res) => {

  // GLOBAL CORS (runs BEFORE Express)
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  app(req, res);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Connected");
    server.listen(process.env.PORT || 5000, () => {
      console.log("Backend running");
    });
  })
  .catch(err => console.log("MONGO ERROR:", err));
