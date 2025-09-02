CREATE SCHEMA `reelevodb` ;
USE reelevodb;
CREATE TABLE geek_user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  firstname     VARCHAR(100) NOT NULL,
  lastname      VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  dateofbirth   DATE NOT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  profile_image_path VARCHAR(255) DEFAULT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE filmer_user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  -- core identity
  first_name       VARCHAR(100) NOT NULL,
  last_name        VARCHAR(100) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  dateofbirth      DATE NOT NULL,
  password_hash    VARCHAR(255) NOT NULL,

  -- profile settings (nullable until user updates profile)
  phone            VARCHAR(20)  DEFAULT NULL,
  profile_image_path VARCHAR(255) DEFAULT NULL,  -- e.g., /uploads/profiles/123.jpg

  -- optional filmer fields
  company          VARCHAR(150) DEFAULT NULL,
  portfolio_url    VARCHAR(255) DEFAULT NULL,
  bio              TEXT         DEFAULT NULL,

  status           ENUM('active','suspended') NOT NULL DEFAULT 'active',
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_filmers_email (email),
  UNIQUE KEY uq_filmers_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    level ENUM('super','operative') DEFAULT 'operative',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

//creating admins
INSERT INTO admins (username, email, password, level)
VALUES
('alpha6', 'alpha.reelevo@gmail.com', SHA2('alpha6relevo', 256), 'super'),
('beta2', 'beta.reelevo@gmail.com', SHA2('beta2operate', 256), 'operative');

//movie table
CREATE TABLE IF NOT EXISTS movies (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_date DATE NOT NULL,
  -- store the selected formats as JSON array, e.g. ["2D","IMAX"]
  release_types JSON NOT NULL,
  poster_path VARCHAR(255) NOT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_movies_release_date (release_date),
  INDEX idx_movies_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

