
const express = require('express');
const router = express.Router();





// Render login page for GET /loginpage
router.get('/login2', (req, res) => {
  res.render('login2');
});



module.exports = router