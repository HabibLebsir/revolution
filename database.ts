import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const openDatabase = async (): Promise<SQLiteDatabase> => {
    return SQLite.openDatabase({ name: 'todo.db', location: 'default' });
};

export const initDB = async () => {
    const db = await openDatabase();
    await db.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            day TEXT NOT NULL,
            time TEXT,
            completed INTEGER NOT NULL
        );`
    );
    return db;
};
