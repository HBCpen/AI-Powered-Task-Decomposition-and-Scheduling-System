const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Project = require('./Project');

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed'),
    defaultValue: 'Not Started'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

// Define the association
Project.hasMany(Task, { as: 'tasks', foreignKey: 'projectId' });
Task.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });

module.exports = Task;
