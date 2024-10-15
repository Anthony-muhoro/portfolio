-- Create the database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT NOT NULL
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (change the password)
INSERT INTO admin (username, password) VALUES ('admin', '$2y$10$YourHashedPasswordHere');

-- Insert default contact info (update with your information)
INSERT INTO contact_info (email, phone, whatsapp) VALUES ('your.email@example.com', '+1234567890', '+1234567890');

-- Insert some sample skills
INSERT INTO skills (name, level) VALUES 
('JavaScript', 90),
('React', 85),
('PHP', 80),
('MySQL', 75);

-- Insert some sample projects
INSERT INTO projects (title, description) VALUES 
('Personal Portfolio', 'A responsive personal portfolio website built with React and PHP'),
('E-commerce Platform', 'A full-stack e-commerce solution with user authentication and payment integration');