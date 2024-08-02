
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getResourceOne() {
  // Query the database and return all resource ones
}

export async function getResourceOneById(id) {
  // Query the database and return the resource with a matching id or null
}

export async function createResourceOne(resource) {
  // Query the database to create an resource and return the newly created resource
}

export async function updateResourceOneById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteResourceOneById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}