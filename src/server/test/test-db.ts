import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { initDatabase } from "../db/init";
import * as schema from "../db/schema";

export function createTestDatabase() {
  const sqlite = new Database(":memory:");
  initDatabase(sqlite);
  const db = drizzle(sqlite, { schema });

  return { db, sqlite };
}
