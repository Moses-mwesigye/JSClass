const express = require('express');
const router = express.Router();
const passport = require('passport');
const Users = require('../models/usersmodel');

// Middleware to check authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Render login page for GET /loginpage
router.get('/loginpage', (req, res) => {
  res.render('loginpage');
});

// API endpoint for current user info (for customer dashboard table)
router.get('/api/users/me', ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

// Login route using passport-local
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect based on role
      if (user.role === 'customer') {
        return res.redirect('/custview');
      }
      if (user.role === 'manager') {
        return res.redirect('/adminpage');
      } else if (user.role === 'salesrep') {
        return res.redirect('/dashboard');
      } else {
        return res.redirect('/index');
      }
    });
  })(req, res, next);
});

// List all users (protected)
router.get('/users', ensureAuthenticated, (req, res) => {
  res.render('users');
});

// Get a single user by ID (protected)
router.get('/users/:id', ensureAuthenticated, async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//Get route displays users in user.pug
router.get('/userslist', async (req, res) => {
  const users = await Users.find();
  res.render('users', { users });
});


// Create a new user using passport-local-mongoose
router.post('/users', async (req, res) => {
  const { role, username, Age, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }
  try {
    if (role === 'manager') {
      const managerCount = await Users.countDocuments({ role: 'manager' });
      if (managerCount >= 2) {
        return res.status(400).send('Manager signup limit reached.');
      }
    }
    await Users.register(
      new Users({ role, username, Age }),
      password
    );
    // After signup, redirect all roles to login page
    res.redirect('/loginpage');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a user (protected)
router.put('/users/:id', ensureAuthenticated, async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user (protected)
router.delete('/users/:id', ensureAuthenticated, async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;