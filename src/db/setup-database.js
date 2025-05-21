import { DatabaseSync } from "node:sqlite";
import { pokemon } from "./pokemon.js";
import fs from "node:fs";

const dbFile = "./src/db/pokemon.db";

const initializeDb = () => {
  fs.unlinkSync(dbFile);
  const db = new DatabaseSync(dbFile);
  try {
    db.exec(
      `CREATE TABLE "pokemon" (
        "id" INTEGER NOT NULL, 
        "name" TEXT, "type" TEXT NOT NULL, 
        "description" TEXT, 
        PRIMARY KEY("id" AUTOINCREMENT))`
    );

    const populateDb = db.prepare(
      "INSERT INTO pokemon (name, type, description) VALUES (?, ?, ?)"
    );

    for (const friend of pokemon) {
      populateDb.run(friend.name, friend.type, friend.description);
    }
    console.log("Database reset");
  } catch (e) {
    console.error(e);
  } finally {
    db.close();
  }
};

initializeDb();

export const db = new DatabaseSync(dbFile);
