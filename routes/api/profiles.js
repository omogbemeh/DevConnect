const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');
const { check ,validationResult } = require('express-validator')

// GET api/profiles/me
// description: Test route
// Public access
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar'])
    
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'})
        }

        res.json(profile)
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

// POST api/profiles/
// description: Create or update user profile
// Privatge access

router.post('/', [ auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Build Profile object

        const profileFields = {}

        profileFields.user = req.user.id;

        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (bio) profileFields.bio = bio;
        if (location) profileFields.location = location;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim())
        }


        //Build Socials object
        profileFields.social = {}

        if (youtube) profileFields.social.youtube = youtube
        if (twitter) profileFields.social.youtube = twitter
        if (facebook) profileFields.social.youtube = facebook
        if (instagram) profileFields.social.youtube = instagram
        if (linkedin) profileFields.social.youtube = linkedin
          
        try {
            let profile = await Profile.findOne({ user: req.user.id})

            if (profile) {
                //Update
                profile = await Profile.findByIdAndUpdate({ user: req.user.id },
                                                          { $set: profileFields },
                                                          { new: true }
                    );

                    return res.json(profile);

            }

            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }           

);

// GET api/profile
// description: Get all profiles
// Public access

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// GET api/profile/user/:user_id
// description: Get all profiles
// Public access

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'avatar'])
        
        if (!profile) return res.status(400).send('Profile not found')

        res.json(profile)
        
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            res.send('Profile not found')
        }
        res.status(500).send('Server Error')
    }
})

// DELETE api/profile
// description: Delete profile, user and posts
// Private access

router.delete('/', [ auth ], async (req, res) => {
    try {
        
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({ msg: 'User Removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router