const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET /api/blogs — fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('GET /api/blogs error:', err.message);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// POST /api/blogs — add a new blog post
router.post('/', async (req, res) => {
  try {
    const { Title, Body, Blog: content } = req.body;

    if (!Title || !Body || !content) {
      return res.status(400).json({ error: 'Title, Body and Blog content are required.' });
    }

    const newBlog = new Blog({ Title, Body, Blog: content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('POST /api/blogs error:', err.message);
    res.status(500).json({ error: 'Failed to add blog' });
  }
});

// DELETE /api/blogs/:id — delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(`DELETE /api/blogs/${req.params.id} error:`, err.message);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

module.exports = router;
