import express from "express";
import { db } from "./db/setup-database.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/all", (req, res) => {
  try {
    const pokemonList = db.prepare("SELECT * FROM pokemon");
    const result = pokemonList.all();
    if (!result) {
      res.status(404).json({ message: "No pokemon found in database :(" });
      return;
    }
    res.json(result);
  } catch (e) {
    res.status(500).json({
      message: `The server responded with an error: ${e.message}.`,
    });
  }
});

app.get("/type/:type", (req, res) => {
  try {
    const type = req.params.type.toLowerCase();
    if (!type) {
      return;
    }
    const typedPokemon = db.prepare("SELECT * FROM pokemon WHERE type = ?");
    const result = typedPokemon.all(type);
    if (!result) {
      res.status(404).json({ message: `Found no pokemon with type ${type}.` });
      return;
    }
    res.json(result);
  } catch (e) {
    res.status(500).json({
      message: `The server responded with an error: ${e.message}.`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
