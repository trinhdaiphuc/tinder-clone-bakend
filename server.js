import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cors from "cors";

import Card from "./dbCard.js";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = process.env.DB_HOST;

// Middware
app.use(express.json());
app.use(Cors())

// DB config
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello clever programers!!!"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  console.log("[INFO]:::: dbCard", dbCard);
  Card.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Card.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`Server is running on port ${port}`));
