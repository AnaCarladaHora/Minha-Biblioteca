const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'library.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
      // Tabela de usuários
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        )
    `);

    console.log('Tabela de usuários criada (se não existir).')
     // Tabela de metas
      db.run(`
        CREATE TABLE IF NOT EXISTS goals (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           title TEXT NOT NULL,
          description TEXT,
          targetDate TEXT NOT NULL,
           status TEXT NOT NULL
        )
    `);
    console.log('Tabela de metas criada (se não existir).')
       // Tabela de livros
        db.run(`
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
               cover TEXT,
                category TEXT NOT NULL,
                comments TEXT,
              rating INTEGER
            )
       `);
    console.log('Tabela de livros criada (se não existir).')
        // Tabela de leituras diárias
       db.run(`
        CREATE TABLE IF NOT EXISTS dailyReadings (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
          pages INTEGER NOT NULL
        )
    `);
    console.log('Tabela de leituras diárias criada (se não existir).')
  }
});

module.exports = db;