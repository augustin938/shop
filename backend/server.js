require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));

// Роуты
app.use('/api/auth', require('./routes/auth.routes'));
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Добавить в server.js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' })); // Для Vite

// Подключить .env
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET || 'secret-fallback';

// Обработка ошибок MongoDB
mongoose.connection.on('error', err => {
  console.error('MongoDB error:', err);
});