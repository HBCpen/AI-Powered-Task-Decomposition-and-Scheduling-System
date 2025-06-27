# Project Structure

This document outlines the directory structure of the AI-Powered Task Decomposition and Scheduling System.

## Root Directory

- `LICENSE`: The MIT license file.
- `README.md`: The main README file for the project.
- `PROJECT_STRUCTURE.md`: This file, which outlines the project structure.
- `backend/`: Contains the Node.js/Express backend application.
- `frontend/`: Contains the React Native mobile application.

## Backend (`/backend`)

The backend is a Node.js project using the Express framework.

- `node_modules/`: Directory for Node.js modules (dependencies).
- `package.json`: Defines the project's dependencies and scripts.
- `package-lock.json`: Records the exact versions of dependencies.
- `.env.example`: An example file for environment variables.
- `.gitignore`: Specifies files to be ignored by Git.
- `src/`: The main source code directory.
  - `controllers/`: Handles incoming requests and business logic.
    - `projectController.js`: Manages project and task-related endpoints.
    - `scheduleController.js`: Manages schedule-related endpoints.
  - `database/`: Contains database connection and query logic.
  - `routes/`: Defines the API routes.
    - `projectRoutes.js`: Routes for project-related endpoints.
    - `scheduleRoutes.js`: Routes for schedule-related endpoints.
  - `services/`: For external API integrations (e.g., Gemini API, iCal parsing).
  - `index.js`: The main entry point for the backend server.

## Frontend (`/frontend`)

The frontend is a React Native application.

- `MotivatreeApp/`: The main directory for the React Native project.
  - `android/`: Android-specific project files.
  - `ios/`: iOS-specific project files.
  - `node_modules/`: Directory for Node.js modules (dependencies).
  - `package.json`: Defines the project's dependencies and scripts.
  - `App.tsx`: The main application component.
  - `index.js`: The entry point for the application.
  - `...` (other configuration files for React Native, Babel, etc.)
