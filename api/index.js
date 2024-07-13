const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
  res.json('test ok');
});

// Create a new transaction
app.post('/api/transaction', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { price, name, description, datetime } = req.body; // grab JSON information from request body
  const transaction = await Transaction.create({
    price,
    name,
    description,
    datetime
  });
  res.json(transaction);
});

// Get all transactions
app.get('/api/transactions', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

// Delete a transaction by ID
app.delete('/api/transaction/:id', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const {id} = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if(!deletedTransaction){
      return res.status(404).send('Transaction not found');
    }
    res.status(200).send('Transaction deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
