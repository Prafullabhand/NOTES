import "./loadEnv.js";
import mongoose from "mongoose";
import app from "./app.js";

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Backend running on port", process.env.PORT || 5000)
    );
  })
  .catch(err => console.log("MONGO ERROR:", err));
