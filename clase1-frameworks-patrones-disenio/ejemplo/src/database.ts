import { DatabaseSync } from 'node:sqlite';

export default class Database {
    static session: DatabaseSync;

    static getSession() {
        if (Database.session) {
            Database.session.open();
            return Database.session;
        }
        Database.session = new DatabaseSync('todo.db');
        return Database.session;
    }
}
