import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3001;
const dbUrl = "mongodb://localhost/crud";

mongoose.connect(dbUrl, (dbErr) => {
  if (dbErr) throw new Error(dbErr);
  else console.log("db connected");

  app.listen(port, (err) => {
    if (err) throw new Error(err);
    else console.log(`listening on port ${port}`);
  });
});
