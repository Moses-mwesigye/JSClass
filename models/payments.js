const mongoose = require('mongoose');
const payments = require('../sroutes/payments')


// Single Payment schema for all payment records
const PaymentSchema = new mongoose.Schema({
  payer: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  method: { type: String }, // e.g., cash, mpesa, bank
  notes: { type: String }
});

module.exports = mongoose.model('Payment', PaymentSchema);
