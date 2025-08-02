const express = require('express')
const router = express.Router()
const Feed = require('../models/feedsmodel');


router.get('/stock', (req, res)=>{
    res.render('feeds')
})

// Get all feeds (JSON)
router.get('/api/feeds', async (req, res) => {
    try {
        const feeds = await Feed.find();
        res.json(feeds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a feed
router.post('/api/feeds', async (req, res) => {
    try {
        const { name, kgs } = req.body;
        const feed = new Feed({ name, kgs });
        await feed.save();
        res.status(201).json(feed);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Edit a feed
router.put('/api/feeds/:id', async (req, res) => {
    try {
        const { name, kgs } = req.body;
        const feed = await Feed.findByIdAndUpdate(req.params.id, { name, kgs }, { new: true });
        if (!feed) return res.status(404).json({ error: 'Feed not found' });
        res.json(feed);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a feed
router.delete('/api/feeds/:id', async (req, res) => {
    try {
        const feed = await Feed.findByIdAndDelete(req.params.id);
        if (!feed) return res.status(404).json({ error: 'Feed not found' });
        res.json({ message: 'Feed deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;