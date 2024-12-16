const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const app = express();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // Load Paystack secret key from .env

app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/verify-payment', async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    if (response.data.data.status === 'success') {
      res.status(200).send({ message: 'Payment successful', data: response.data });
    } else {
      res.status(400).send({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message); // Log the exact error
    res.status(500).send({ message: 'An error occurred while verifying payment' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
