const express = require('express');
const router = express.Router();
const SolarSystem = require('../Models/model.js');

// Save Configuration
router.post('/save', async (req, res) => {
  try {
    const { userId, planets } = req.body;
    const config = new SolarSystem({ userId, planets });
    await config.save();
    res.json({ message: 'Configuration saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Configuration
router.get('/load/:userId', async (req, res) => {
    try {
      console.log(`Loading configuration for user: ${req.params.userId}`);
      const config = await SolarSystem.findOne({ userId: req.params.userId });
  
      if (!config) {
        console.log("No configuration found!");
        return res.status(404).json({ message: "No configuration found" });
      }
  
      res.json(config);
    } catch (err) {
      console.error("🔥 ERROR fetching configuration:", err); // Logs full error
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
