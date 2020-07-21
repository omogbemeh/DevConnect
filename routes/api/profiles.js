const express = require('express');
const router = express.Router()

// GET api/auth
// description: Test route
// Public access
router.get('/', (req, res) => res.send('Profiles route'))

module.exports = router