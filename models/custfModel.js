const mongoose =  require('mongoose');
const  rrt = require('../sroutes/routes');

const custSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    }
    ,

    lnin:{
        type:String,
        required:true
    }
    
    ,
    lnombre:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('customersData', custSchema);