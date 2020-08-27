const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');
const { check ,validationResult } = require('express-validator')
const request = require('request');
const config = require('config');

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

// POST api/profile
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
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true, upsert: true }
            );
            res.json(profile);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
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


// PUT api/profile/experience
// description: Add profile experience
// Private access

router.put('/experience', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { 
        title, 
        company, 
        location,
        from,
        to,
        current,
        description
        } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }

})

// DELETe api/profile/experience/:exd_id
// description: Delete experience from profile
// Private access

router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const doc = profile.experience.id(req.params.exp_id)
        doc.remove();
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//Make Route for Education
// PUT api/profile/education
// description: Add education to profile
// Private access

router.put('/education', [ auth, 
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(), 
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})

    const { 
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description,
        current
    } = req.body

    const newEd = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description,
        current
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEd);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

// Delete a particular Route for Education
// PUT api/profile/education/:ed_id
// description: Add education to profile
// Private access

router.delete('/education/:ed_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const doc = profile.education.id(req.params.ed_id);
        doc.remove();
        await profile.save(); 
        res.json(profile)     
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

// Get github details
// GET api/profile/github/:username
// description: Get user repo from github
// Public access

router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) res.status(404).json({ msg: 'No Github profile found'});
            res.json(JSON.parse(body));

        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})
module.exports = router

