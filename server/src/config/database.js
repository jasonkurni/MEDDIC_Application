const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database/meddic.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Add MEDDIC completion checkbox columns if they don't exist
const alterTableStatements = [
  'ALTER TABLE deals ADD COLUMN metric_complete INTEGER DEFAULT 0',
  'ALTER TABLE deals ADD COLUMN economic_buyer_complete INTEGER DEFAULT 0',
  'ALTER TABLE deals ADD COLUMN decision_criteria_complete INTEGER DEFAULT 0',
  'ALTER TABLE deals ADD COLUMN decision_process_complete INTEGER DEFAULT 0',
  'ALTER TABLE deals ADD COLUMN identified_pain_complete INTEGER DEFAULT 0',
  'ALTER TABLE deals ADD COLUMN champion_complete INTEGER DEFAULT 0',
  'ALTER TABLE deals ADD COLUMN competition_complete INTEGER DEFAULT 0',
];

alterTableStatements.forEach((statement) => {
  db.run(statement, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error altering table:', err.message);
    }
  });
});

module.exports = db;

// Made with Bob
