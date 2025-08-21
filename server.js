/**
 * LINE LIFF Application Server
 * พัฒนาโดย: cooolbite
 * เวอร์ชัน: 1.0.0
 */

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create users table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      line_user_id VARCHAR(255) UNIQUE NOT NULL,
      display_name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(20),
      address TEXT,
      birth_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Users table ready');
    }
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.post('/api/users', (req, res) => {
  const { line_user_id, display_name, email, phone, address, birth_date } = req.body;
  
  const insertQuery = `
    INSERT INTO users (line_user_id, display_name, email, phone, address, birth_date) 
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
    display_name = VALUES(display_name),
    email = VALUES(email),
    phone = VALUES(phone),
    address = VALUES(address),
    birth_date = VALUES(birth_date)
  `;
  
  db.query(insertQuery, [line_user_id, display_name, email, phone, address, birth_date], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ success: true, message: 'User data saved successfully' });
  });
});

app.get('/api/users/:line_user_id', (req, res) => {
  const { line_user_id } = req.params;
  
  const selectQuery = 'SELECT * FROM users WHERE line_user_id = ?';
  
  db.query(selectQuery, [line_user_id], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
