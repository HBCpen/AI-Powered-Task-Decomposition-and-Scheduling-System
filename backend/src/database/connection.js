const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the database file
  logging: false // Disable logging for cleaner output, can be enabled for debugging
});

module.exports = sequelize;