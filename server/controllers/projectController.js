
const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
};
