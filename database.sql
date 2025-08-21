-- LINE LIFF Application Database
-- พัฒนาโดย: cooolbite
-- เวอร์ชัน: 1.0.0

-- Create database
CREATE DATABASE IF NOT EXISTS line_liff_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use database
USE line_liff_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    line_user_id VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    birth_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_line_user_id (line_user_id),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
INSERT INTO users (line_user_id, display_name, email, phone, address, birth_date) VALUES
('U1234567890abcdef', 'สมชาย ใจดี', 'somchai@example.com', '0812345678', '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', '1990-05-15'),
('U0987654321fedcba', 'สมหญิง รักดี', 'somying@example.com', '0898765432', '456 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400', '1988-12-03');

-- Show table structure
DESCRIBE users;

-- Show sample data
SELECT * FROM users;
