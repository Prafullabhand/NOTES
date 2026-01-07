import "./loadEnv.js";
import mongoose from "mongoose";
import app from "./app.js";

console.log("ENV CHECK:", process.env.MONGO_URI, process.env.CLOUDINARY_API_KEY);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Connected");
    app.listen(process.env.PORT, () =>
      console.log("Backend running on port", process.env.PORT)
    );
  })
  .catch(err => console.log("MONGO ERROR:", err));
