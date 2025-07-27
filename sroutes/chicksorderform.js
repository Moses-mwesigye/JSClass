const express = require('express')
const router = express.Router()
const chicsSchema = require('../models/chicsmodel')

router.get('/chicsorder',(req, res)=>{
    res.render('chicsorder')
})

router.post('/chicsorder', async(req, res)=>{
    try{
console.log(req.body)
const newchics = new chicsSchema(req.body);
await newchics.save()
    }catch(error){
        console.error()
    }
})




module.exports = router;