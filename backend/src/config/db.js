const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../../salesflow.db");

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS deals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        client_name TEXT NOT NULL,
        company TEXT,
        email TEXT,
        value REAL NOT NULL,
        stage TEXT NOT NULL CHECK(
            stage IN (
                'Nuevo',
                'Contactado',
                'Propuesta',
                'Ganado',
                'Perdido'
            )
        ),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`);

console.log("Base de datos SQLite conectada correctamente");

module.exports = db;