 //(1)Importing the dependencies
const express = require('express')
const app = express()

const routes= require('./sroutes/routes')
const custf = require('./sroutes/custform')
const salesrep = require('./sroutes/salesrep')
const chicsorder = require('./sroutes/chicksorderform')
const adminlog = require('./sroutes/admin')
const feeds = require('./sroutes/feeds')
const home1 = require('./sroutes/home1')
const paymnets = require('./sroutes/payments')
const requests = require('./sroutes/requests')
const users = require('./sroutes/users')
const login2= require('./sroutes/login2')
const passport = require('passport');
const User = require('./models/usersmodel');
const signup = require('./sroutes/signup')
const signup2 = require('./sroutes/signup2')
const paymentsRoutes = require('./sroutes/payments');
const adminRoutes = require('./sroutes/admin');

const mongoose = require('mongoose')




//(2)Instantiations

const port = 4000
 





//(3)Configurations
path = require('path')
app.set('view engine', 'pug')
app.set('views', path.join(__dirname ,'views'))

//DATABASE

mongoose.connect('mongodb+srv://mwesigyemoses256:emroCRssdr5hGrN0@cluster0.ofh4r1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connection.once('open', ()=>{
    console.log('Mongoose Connection Open')
})
.on('error', (error)=>{
    console.log(`connection error${error.message}`)
})



// Passport local strategy setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const session = require('express-session');
const expressSession = session({
  secret: 'mwesigye',
  resave: false,
  saveUninitialized: false
});




//(4)Middleware
app.use(express.json()) // <-- Add this to parse JSON bodies
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

//express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());


//app is a method of express library

app.use('/', chicsorder)
app.use('/', salesrep)
app.use('/', custf)
app.use('/', routes)
app.use('/', adminlog)
app.use ('/', feeds)
app.use('/', home1)
app.use('/', paymnets)
app.use('/', requests)
app.use('/', users)
app.use('/', signup)
app.use('/', login2)
app.use('/', signup2)
app.use(paymentsRoutes);
app.use(adminRoutes);


//middle ware handles nonexistant routes
app.use((req, res) =>{
    res.status(404).send('oops page not found')
})



//always the last line
app.listen(port, () => console.log(`I am connected to port ${port}`)) 