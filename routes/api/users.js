const express = require('express');
const router = express.Router()

// GET api/users
// description: view users and other things
// Public access
router.get('/', (req, res) => res.send('User route'))

module.exports = router