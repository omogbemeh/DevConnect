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

        if (!post) return res.status(404).json({ sg: 'Post not found'});
        
        if (post.user.toString() !== req.user.id) res.status(401).json({ msg: 'user not authorised'});
        await post.remove();
       
        res.json({ msg: 'Post Removed' })
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

        if(post.likes.filter( like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save()
        res.json(post.likes);
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

        if(post.likes.filter( like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked' });
        }

        post.likes = post.likes.filter(like => like.user.toString() !== req.user.id)
        
        await post.save();

        res.json(post.likes)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// POST api/posts/comment/:post_id
// description: comment on a post
// Private access

router.post('/comment/:post_id', [ auth, [
    check('text', 'Text is required').not().isEmpty(),
]],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).json({ errors: errors.array() })
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);

        const newComment =  {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);

        await post.save()

        res.json(post.comments);        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// DELETE api/posts/comment/:post_id/:comment_id
// description: delete a comment on a post
// Private access
router.delete('/comment/:post_id/:comment_id', auth, 
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id);

            // Check if comment exists
            const comment = post.comments.find(comment => comment.id = req.params.comment_id);
            if(!comment) res.status(404).send('Comment not found');

            //Check if its the owner of the comment deleting it
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).send('You are not authorized to delete thnis comment')
            } 
            post.comments = post.comments.filter(comment => {comment.id !== req.params.comment_id})
            await post.save()
            res.json(post.comments)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')  
        }

})
module.exports = router