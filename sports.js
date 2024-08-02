
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";
export async function getSports() {
  // Query the database and return all sports
  const result = await pool.query('SELECT * FROM sports');
  return result.rows;
}

export async function getSportById(id) {
  // Query the database and return the sport with a matching id or null
  const result = await pool.query('SELECT * FROM sports WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createSport(sport) {
  // Query the database to create a sport and return the newly created sport
  const result = await pool.query(
    'INSERT INTO sports (name) VALUES ($1) RETURNING *',
    [sport.name]
  );
  return result.rows[0];
}

export async function updateSportById(id, updates) {
  // Query the database to update the sport and return the newly updated sport or null
  const fields = Object.keys(updates);
  const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
  const values = [id, ...fields.map(field => updates[field])];
  const result = await pool.query(
    `UPDATE sports SET ${setClause} WHERE id = $1 RETURNING *`,
    values
  );
  return result.rows[0] || null;
}

export async function deleteSportById(id) {
  // Query the database to delete the sport and return the deleted sport or null
  const result = await pool.query('DELETE FROM sports WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
}