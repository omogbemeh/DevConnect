const express = require('express');
const router = express.Router()

// GET api/auth
// description: Posts route
// Public access
router.get('/', (req, res) => res.send('Posts route'))

module.exports = router