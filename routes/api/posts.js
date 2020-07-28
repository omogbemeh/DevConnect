const express = require('express');
const router = express.Router()
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profiles = require('../../models/Profiles');

const Post = require('../../models/Posts')
const User = require('../../models/User');
const { json } = require('express');

// POST api/posts
// description: Posts route
// Private access

router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty(),
]],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).json({ errors: errors.array() })
    
    try {
        const user = await User.findById(req.user.id).select('-password');
    
        const newPost = new Post ({
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();

        res.json(post);        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// GET api/posts
// description: Posts route
// Private access

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// GET api/posts/:id
// description: Get post by id
// Private access

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) res.json(post)
        res.status(404).send('Post not found')
        
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') res.status(400).json({ msg: 'Post not found' })
        res.status(500).send('Server Error')
    }
})

// GET api/posts/:id
// description: Get post by id
// Private access

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.user.toString() !== req.user.id) res.status(401).json({ msg: 'user not authorised'});
        await post.remove();

        res.send('Post removed')
       
        
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') res.status(404).json({ msg: 'Post not found' })
        res.status(500).send('Server Error')
    }
})

// PUT api/posts/like/:id
// description: like a post
// Private access

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        // Check if the post has been liked by a user

        if(post.likes.map( like => like.user.toString() === req.user.id.length > 1)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save()
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// PUT api/posts/unlike/:id
// description: UN-like a post
// Private access

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        // Check if the post has been liked by a user

        if(post.likes.filter( like => like.user.toString() === req.user.id.length === 0)) {
            return res.status(400).json({ msg: 'Post has not been liked' });
        }

        //Get Remove index

        const like = post.likes.id(req.params.id);
        await like.remove();
        await post.save();
        res.json(post.likes)

        await post.save()
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})
module.exports = router