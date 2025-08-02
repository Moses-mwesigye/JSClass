const express = require('express')
const router = express.Router()


// soo important for picking data has to be above routes
router.use(express.urlencoded({ extended: false }));



//this covers static files like image paths specifically in the created public folder
router.use(express.static('public'));

//postman testing of routes
router.get('/', (req, res) => {
    res.render('loginpage')
});
router.post('/node', (req, res) => {
    res.send('this is post')
});
router.delete('/bomb', (req, res) => {
    res.send('this is delete')
});

// //path parameters examples ie profile,users,stories
// router.get('/profile/:username', (req, res) => {
//     res.send('This is a path parameter' + req.params.username)
// });

// //query strings
// router.get('/queryparams',(req, res)=>{
//     res.send('my queryparams are:'+req.query.class+'and'+req.query.cohort)



module.exports = router;
