const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET /api/profile - fetch profile data
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    
    // Auto-repair for old broken production paths
    if (profile.profilePhoto === '/src/assets/img/bhuvi_official.jpg') {
      profile.profilePhoto = '/bhuvi_official.jpg';
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    console.error('GET /api/profile error:', err.message);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /api/profile - update profile data
router.put('/', async (req, res) => {
  try {
    const updateData = req.body;
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(updateData);
    } else {
      Object.assign(profile, updateData);
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('PUT /api/profile error:', err.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
