-- Database schema for Accredian Referral Platform

-- Drop existing tables if they exist
DROP TABLE IF EXISTS referrals CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE referrals (
    id SERIAL PRIMARY KEY,
    referrer_name VARCHAR(100) NOT NULL,
    referrer_email VARCHAR(100) NOT NULL,
    referee_name VARCHAR(100) NOT NULL,
    referee_email VARCHAR(100) NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
