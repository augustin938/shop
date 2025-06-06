const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Получить все товары
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить новый товар
router.post('/', async (req, res) => {
  const { title, price, image, category } = req.body;
  const product = new Product({ title, price, image, category });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;