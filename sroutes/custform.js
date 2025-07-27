const express = require('express')
const router = express.Router()
const custSchema = require('../models/custfModel')
const connect = require('connect-ensure-login')

router.get('/custreg', (req, res)=>{
    res.render('custf')
})

router.post('/custreg', async(req, res)=>{
    try{

    console.log(req.body)
    const newCustomer = new custSchema(req.body)
    await newCustomer.save()
    }catch(error){
        (console.error());
    res.send('Data has not been sent to the Database')
    }
})


module.exports= router;