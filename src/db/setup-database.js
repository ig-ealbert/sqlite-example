import { DatabaseSync } from "node:sqlite";
import { pokemon } from "./pokemon.js";

const dbFile = "./src/db/pokemon.db";

const initializeDb = () => {
  const db = new DatabaseSync(dbFile);
  try {
    db.exec(
      `CREATE TABLE IF NOT EXISTS "pokemon" (
        "id" INTEGER NOT NULL, 
        "name" TEXT, "type" TEXT NOT NULL, 
        "description" TEXT, 
        PRIMARY KEY("id"))`
    );

    const populateDb = db.prepare(
      "INSERT OR IGNORE INTO pokemon (id, name, type, description) VALUES (?, ?, ?, ?)"
    );

    for (const friend of pokemon) {
      populateDb.run(friend.id, friend.name, friend.type, friend.description);
    }
  } catch (e) {
    console.error(e);
  } finally {
    db.close();
  }
};

initializeDb();

export const db = new DatabaseSync(dbFile);
