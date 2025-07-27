const express = require('express')
const router = express.Router()



router.get('/requests', (req, res)=>{
    res.render('requests')
})




module.exports = router