import { pool } from "../index.js";


async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
    DROP TABLE IF EXISTS artist_sports CASCADE;
    DROP TABLE IF EXISTS artist_drugs CASCADE;
    DROP TABLE IF EXISTS artists CASCADE;
    DROP TABLE IF EXISTS sports CASCADE;
    DROP TABLE IF EXISTS drugs CASCADE;
    `);

    // Create the artists table
    await pool.query(`
    CREATE TABLE artists (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INT
        );
    `);

    // Create the sports table
    await pool.query(`
    CREATE TABLE sports (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name VARCHAR(255) NOT NULL
        );
    `);
// Create the drugs table
await pool.query(`
CREATE TABLE drugs (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255)
);
`);

// Create the artist_sports junction table
await pool.query(`
CREATE TABLE artist_sports (
    artist_id INT REFERENCES artists(id),
    sport_id INT REFERENCES sports(id),
    PRIMARY KEY (artist_id, sport_id)
);
`);

// Create the artist_drugs junction table
await pool.query(`
CREATE TABLE artist_drugs (
    artist_id INT REFERENCES artists(id),
    drug_id INT REFERENCES drugs(id),
    PRIMARY KEY (artist_id, drug_id)
);
`);
    // Seed the artists table with example painters
    await pool.query(`
    INSERT INTO artists (name, age)
    VALUES 
        ('Pablo Picasso', 91),
        ('Henri Matisse', 84);
    `);

    // Seed the sports table
    await pool.query(`
    INSERT INTO sports (name)
    VALUES 
        ('Football'),
        ('Basketball');
    `);
// Seed the drugs table
await pool.query(`
INSERT INTO drugs (name, type)
VALUES 
    ('Aspirin', 'Painkiller'),
    ('Penicillin', 'Antibiotic');
`);

// // Seed the artist_sports junction table
// await pool.query(`
// INSERT INTO artist_sports (artist_id, sport_id)
// VALUES 
//     (1, 1),  // Picasso is associated with Football
//     (2, 2);  // Matisse is associated with Basketball
// `);

// // Seed the artist_drugs junction table
// await pool.query(`
// INSERT INTO artist_drugs (artist_id, drug_id)
// VALUES 
//     (1, 1),  // Picasso uses Aspirin
//     (2, 2);  // Matisse uses Penicillin
// `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
