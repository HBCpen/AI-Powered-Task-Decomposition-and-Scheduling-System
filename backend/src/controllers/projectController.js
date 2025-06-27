const createProject = (req, res) => {
  // TODO: Implement project creation logic
  res.status(201).send('Project created');
};

const getTasks = (req, res) => {
  // TODO: Implement task retrieval logic
  res.status(200).send(`Tasks for project ${req.params.id}`);
};

module.exports = {
  createProject,
  getTasks,
};
