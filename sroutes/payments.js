const express = require('express');
const router = express.Router();
const Payment = require('../models/payments'); // Adjust path if needed

// Add Bank Payment
router.post('/api/payments/bank', async (req, res) => {
  try {
    const payment = new Payment({
      payer: req.body.name,
      amount: req.body.amount,
      notes: req.body.notes,
      method: 'bank'
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add MOMO Payment
router.post('/api/payments/momo', async (req, res) => {
  try {
    const payment = new Payment({
      payer: req.body.name,
      amount: req.body.amount,
      notes: req.body.notes,
      method: 'momo'
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Render payments.pug (if needed)
router.get('/pay', (req, res) => {
  res.render('payments');
});

// API: Get all payments as JSON
router.get('/payments/all', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Render paymentslist.pug with all payments
router.get('/paymentslist', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.render('paymentslist', { payments });
  } catch (err) {
    res.status(500).send('Could not load payments list');
  }
});

module.exports = router;