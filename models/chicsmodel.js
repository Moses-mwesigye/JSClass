const mongoose = require('mongoose')
const gxx = require('../sroutes/chicksorderform')

const chicsSchema = new mongoose.Schema({
    qty:{
        type:Number,
        required:true
    },
    broiler:{
        type:String,
        required:false
    },
    layer:{
        type:String,
        required:false
    }
})
module.exports = mongoose.model('chicsordering', chicsSchema)