const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/pricing', (req, res) => {
  const version = req.__chosenVersion || 'blue';
  const method = req.__routingMethod || 'unknown';
 
  const log={
    timestamp: new Date().toISOString(),
    ip: req.ip,
    versionServed: version,
    routingMethod: method
  }

  //log request metadata and pricing version
  console.log(log);

  const fileName = version === 'green' ? 'green.json' : 'blue.json';
  const fullPath = path.join(__dirname,'data', fileName);
  try {
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    res.json(data);
  } catch (err) {
    console.error('Error reading pricing JSON:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
