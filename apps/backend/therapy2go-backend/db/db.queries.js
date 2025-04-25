const db = require('./db.connection');

async function createUsersTable() {
  const queryText = `
       CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL
       );
     `;
  try {
    await db.query(queryText);
    console.log('Users table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

async function insertUser(name, email) {
  const queryText = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
  const values = [name, email];
  try {
    const res = await db.query(queryText, values);
    console.log('User inserted:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err;
  }
}

async function getAllUsers() {
  const queryText = 'SELECT * FROM users';
  try {
    const res = await db.query(queryText);
    return res.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
}

module.exports = {
  createUsersTable,
  insertUser,
  getAllUsers,
};
