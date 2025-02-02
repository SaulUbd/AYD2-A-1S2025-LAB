import Database from './database.js';

const db = Database.getSession();
db.exec(`
    CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT
    )
    `);
db.close();

console.log('Created "todos" table');
