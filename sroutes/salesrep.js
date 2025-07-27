const express = require('express');
const SalesRep = require('../models/salesrepschema');
const router = express.Router();

// Sales Rep Signup (Admin only)
router.post('/admin/salesreps', async (req, res) => {
  const { username, password, fname, lname } = req.body;
  if (!username || !password || !fname || !lname) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const rep = new SalesRep({ username, password, fname, lname });
    await rep.save();
    res.status(201).json({ message: 'Sales rep created successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sales Rep Login
router.post('/salesrep/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }
  try {
    const rep = await SalesRep.findOne({ username });
    if (!rep) return res.status(401).json({ error: 'Invalid credentials.' });
    const valid = await rep.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });
    // Optionally set session/cookie here
    res.json({ message: 'Login successful', rep: { username: rep.username, fname: rep.fname, lname: rep.lname } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

router.get('/salesrep',(req, res)=>{
    res.render('salesrep')
})

router.post('/salesrep', async(req, res)=>{
    try{
console.log(req.body)
const newsales =new salesSchema(req.body);
await newsales.save()
    }catch(error){
        console.error()
    }
})

module.exports = router;