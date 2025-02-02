import Database from './database.js';

interface TodoItem {
    id: number;
    title: number;
}

export default class Todo {
    all() {
        const db = Database.getSession();

        const getStmt = db.prepare('SELECT * FROM todos');
        const result = getStmt.all() as TodoItem[];

        db.close();
        return result;
    }

    create(title: string) {
        const db = Database.getSession();

        const insertStmt = db.prepare('INSERT INTO todos (title) VALUES (?)');
        insertStmt.run(title);

        db.close();
    }

    delete(id: number) {
        const db = Database.getSession();

        const deleteStmt = db.prepare('DELETE FROM todos WHERE id = ?');
        deleteStmt.run(id);

        db.close();
    }
}
