
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getArtists() {
  // Query the database and return all get all artists
  const result = await pool.query('SELECT * FROM artists');
  return result.rows;
}

export async function getArtistById(id) {
  // Query the database and return an artist with a matching id or null
  const result = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createArtist(artist) {
  // Query the database to create new artist and return the newly created artist
  const result = await pool.query(
    'INSERT INTO artists (name, age) VALUES ($1, $2) RETURNING *',
    [artist.name, artist.age]
  );
  return result.rows[0];
}

export async function updateArtistById(id, updates) {
  // Query the database to update the artist and return the newly updated artist or null
  const fields = Object.keys(updates);
  const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
  const values = [id, ...fields.map(field => updates[field])];
  const result = await pool.query(
    `UPDATE artists SET ${setClause} WHERE id = $1 RETURNING *`,
    values
  );
  return result.rows[0] || null;
}
export async function deleteArtistById(id) {
  // Query the database to delete the artist and return the deleted artist or null
    const result = await pool.query('DELETE FROM artists WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
};