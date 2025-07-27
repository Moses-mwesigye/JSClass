// Middleware to check authentication


const express = require('express')
const router = express.Router()
const AdminRequest = require('../models/adminmodel')

// Render admin page
router.get('/adminpage', (req, res) => {
    res.render('admin')
})

// Get all admin requests
router.get('/admin/requests', async (req, res) => {
    try {
        const requests = await AdminRequest.find().sort({ createdAt: -1 })
        res.json(requests)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Create a new admin request
router.post('/admin/requests', async (req, res) => {
    try {
        const { date, chicks, farmer, agent, approved } = req.body
        const newRequest = new AdminRequest({ date, chicks, farmer, agent, approved })
        await newRequest.save()
        res.status(201).json(newRequest)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})



// Update an admin request
router.put('/admin/requests/:id', async (req, res) => {
    try {
        const updated = await AdminRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updated) return res.status(404).json({ error: 'Not found' })
        res.json(updated)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Delete an admin request
router.delete('/admin/requests/:id', async (req, res) => {
    try {
        const deleted = await AdminRequest.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ error: 'Not found' })
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})






module.exports = router