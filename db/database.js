const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, 'tasks.db');
const schemaPath = path.resolve(__dirname, '../module/schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database: ', err.message);
    } else {
        console.log('Connected to SQLite database');

        const schema = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schema, (err) => {
            if (err) {
                console.error('Error executing schema', err.message);
            } else {
                console.log('Database schema ensured');
            }
        });
    }
});

module.exports = db;
