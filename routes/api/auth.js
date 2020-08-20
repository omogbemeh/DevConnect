const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult} = require('express-validator')
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

// GET api/auth
// description: Test route
// Public access
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// Authenticate User & get token
// Public access

router.post('/', [
    check('email', 'Please Enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
    async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const { email, password } = req.body

    try {
        // Check if the user exists
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]})
        }
        const payload = {
            user: {
                id: user.id //user
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtToken'), // secret
            {expiresIn: 360000}, // expiration period
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error')
        
    }
    
})
module.exports = router