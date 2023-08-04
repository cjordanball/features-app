import * as SQLite from 'expo-sqlite';
import { Place } from '@/types';

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

export const insertPlace = (place: Place) => {
	const promise = new Promise((res, rej) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?)`,
				[
					place.title as string,
					place.imageURL as string,
					place.address as string,
					place.location.lat,
					place.location.lng,
				],
				(_, result) => {
					res(result);
				},

				(_, err) => {
					rej(err);
				}
			);
		});
	});
	return promise;
};

export const fetchPlaces = () => {
	const promise = new Promise((res, rej) => {
		database.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM places`,
				[],
				(_, result) => {
					const rawPlaces = result.rows._array;
					const PlacePlaces: Array<Place> = rawPlaces.map((rawPlace) => {
						return {
							address: rawPlace.address,
							title: rawPlace.title,
							imageURL: rawPlace.imageUri,
							location: {
								lat: rawPlace.lat,
								lng: rawPlace.lng,
							},
							id: rawPlace.id.toString(),
						};
					});
					res(PlacePlaces);
				},

				(_, err) => {
					rej(err);
				}
			);
		});
	});
	return promise;
};
