const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb+srv://bushra:99377%40aa@cluster0.8db7mbz.mongodb.net/?appName=Cluster0';

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
