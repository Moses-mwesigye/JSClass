const express = require('express')
const router = express.Router()


router.get('/dashboard', (req, res)=>{
    res.render('home1')
}) 


router.get('/custview', (req,res)=>{
res.render('customerview')
})

module.exports = router;