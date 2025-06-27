const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');

// Import models to ensure they are registered with Sequelize
require('./models/Project');
require('./models/Task');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Use routes
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/projects/:projectId/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Function to connect to the database and start the server
const startServer = async () => {
  try {
    // Using { alter: true } is safer for development as it tries to update tables without dropping them.
    // For production, you might want a more robust migration strategy.
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();


