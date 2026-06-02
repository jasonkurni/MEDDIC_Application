const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '../../database');
const dbPath = path.join(dbDir, 'meddic.db');

// Create database directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error creating database:', err.message);
    process.exit(1);
  } else {
    console.log('Database file created/connected successfully');
  }
});

// SQL schema
const schema = `
CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Basic Information
    company_name TEXT NOT NULL,
    opportunity_description TEXT,
    why_ibm TEXT,
    project_name TEXT,
    business_owner TEXT,
    close_date TEXT,
    value_usd REAL,
    
    -- MEDDIC Fields
    metric TEXT,
    economic_buyer TEXT,
    decision_criteria TEXT,
    decision_process TEXT,
    identified_pain TEXT,
    champion TEXT,
    competition TEXT,
    
    -- Action Items
    next_actions TEXT,
    action_date TEXT,
    action_owner TEXT,
    
    -- Metadata
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_company_name ON deals(company_name);
CREATE INDEX IF NOT EXISTS idx_close_date ON deals(close_date);
CREATE INDEX IF NOT EXISTS idx_created_at ON deals(created_at);
`;

// Initialize database
db.exec(schema, (err) => {
  if (err) {
    console.error('Error creating schema:', err.message);
    process.exit(1);
  } else {
    console.log('Database schema created successfully');
    console.log('Database initialized at:', dbPath);
    
    // Insert sample data
    const sampleData = `
    INSERT OR IGNORE INTO deals (id, company_name, opportunity_description, value_usd, close_date, metric, economic_buyer)
    VALUES 
      (1, 'Acme Corporation', 'Cloud migration and modernization project', 250000, '2026-08-15', 'Reduce infrastructure costs by 30%', 'CTO John Smith'),
      (2, 'Tech Solutions Inc', 'AI-powered analytics platform implementation', 500000, '2026-09-30', 'Increase operational efficiency by 40%', 'CFO Sarah Johnson');
    `;
    
    db.exec(sampleData, (err) => {
      if (err) {
        console.log('Note: Sample data may already exist');
      } else {
        console.log('Sample data inserted successfully');
      }
      
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database initialization complete!');
        }
      });
    });
  }
});

// Made with Bob
