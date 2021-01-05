import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Character from "./character";
import { ObjectId } from "mongodb";

const app = express();
const port = 3001;
const dbUrl = "mongodb://localhost/crud";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbUrl, (dbErr) => {
  if (dbErr) throw new Error(dbErr);
  else console.log("db connected");

  app.post("/api/characters", (request, response) => {
    const { name, age } = request.body;

    new Character({ name, age }).save((err) => {
      if (err) response.status(500);
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send();
          else response.status(200).send(characterArray);
        });
      }
    });
  });

  app.get("/api/characters", (request, response) => {
    console.log("SEND CHARACTERS");
    Character.find({}, (err, characterArray) => {
      if (err) response.status(500).send();
      else response.status(200).send(characterArray);
    });
  });

  app.put("/api/characters", (request, response) => {
    const { id } = request.body;
    Character.findByIdAndUpdate(
      new ObjectId(id),
      { $inc: { age: 1 } },
      (err) => {
        if (err) response.status(500).send();
        else {
          Character.find({}, (findErr, characterArray) => {
            if (findErr) response.status(500).send();
            else response.status(200).send(characterArray);
          });
        }
      }
    );
  });

  app.delete("/api/characters", (request, response) => {
    const { id } = request.body;
    Character.findByIdAndRemove(new ObjectId(id), (err) => {
      if (err) response.status(500).send();
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send();
          else response.status(200).send(characterArray);
        });
      }
    });
  });

  app.listen(port, (err) => {
    if (err) throw new Error(err);
    else {
      console.log(`listening on port ${port}`);
    }
  });
});
