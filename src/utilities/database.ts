import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');

export function init() {
	const promise = new Promise((res: (x: null) => void, rej) => {
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS places (
					id INTEGER PRIMARY KEY NOT NULL,
					title TEXT NOT NULL,
					imageUri TEXT NOT NULL,
					address TEXT NOT NULL,
					lat REAL NOT NULL,
					lng REAL NOT NULL
				)`,
				[],
				() => {
					res(null);
				},
				(_, err) => {
					rej(err);
				}
			);
		});
	});
	return promise;
}
