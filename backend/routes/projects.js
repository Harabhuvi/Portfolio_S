const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects — fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('GET /api/projects error:', err.message);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST /api/projects — add a new project
router.post('/', async (req, res) => {
  try {
    const { Title, Description, CoverLink, GitLink, Previewlink } = req.body;

    if (!Title || !Description || !CoverLink || !GitLink) {
      return res.status(400).json({ error: 'Title, Description, CoverLink and GitLink are required.' });
    }

    const newProject = new Project({ Title, Description, CoverLink, GitLink, Previewlink });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('POST /api/projects error:', err.message);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// DELETE /api/projects/:id — delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
        return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(`DELETE /api/projects/${req.params.id} error:`, err.message);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
