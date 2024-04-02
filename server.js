const express = require('express');
const mongoose = require('mongoose');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Cesiveroo', {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/api/clients', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
