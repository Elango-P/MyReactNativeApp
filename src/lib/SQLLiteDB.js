import SQLite from 'react-native-sqlite-storage';
import ArrayList from './ArrayList';

let db;

class SQLiteDB {
  static DB = this.open('oneportal.db');

  static open(DataBase) {
    db = SQLite.openDatabase(
      {name: DataBase, location: 'default'},
      () => {
        console.log(`Database ${DataBase} opened`);
        // Create the table if it doesn't exist
        db.transaction(tx => {
          tx.executeSql(
            `
            CREATE TABLE IF NOT EXISTS product_index (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              column1 TEXT,
              column2 TEXT
            );
          `,
            [],
            (tx, result) => {
              console.log('Table created or already exists.');
            },
            error => {
              console.error('Error creating table: ', error);
            },
          );
        });
      },
      error => console.log('Error opening database: ', error),
    );
    return db;
  }
  static async dropTableIfExists(tableName) {
    // Check if the table exists
    const result = await SQLiteDB.runQuery(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`,
      [tableName],
    );

    if (result.length > 0) {
      // If the table exists, drop it
      await SQLiteDB.runQuery(`DROP TABLE ${tableName};`);
      console.log(`Table ${tableName} dropped successfully.`);
    } else {
      console.log(`Table ${tableName} does not exist.`);
    }
  }

  static async runQuery(query, values = []) {
    console.log('Type of query:', typeof query);

    if (typeof query !== 'string') {
      console.error('Query must be a string.');
      return Promise.reject(new Error('Query must be a string.'));
    }

    if (!query) {
      console.error('Query is required.');
      return Promise.reject(new Error('Query is required.'));
    }

    if (!db) {
      console.error('Database connection is not established.');
      return Promise.reject(
        new Error('Database connection is not established.'),
      );
    }

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          query,
          values,
          (tx, result) => {
            let returnValue = [];
            if (result.rows && result.rows.length > 0) {
              returnValue = result.rows; // Assuming rows is the result set
            } else if (result.insertId) {
              returnValue = [result.insertId]; // Return the insert ID for insert queries as an array
            }

            resolve(returnValue);
          },
          error => {
            console.error(
              'Error Executing the Query: ',
              error.message || error,
            );
            reject(
              new Error(`Error Executing the Query: ${error.message || error}`),
            );
          },
        );
      });
    });
  }
}

export default SQLiteDB;
