const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение MongoDB
mongoose.connect('mongodb://localhost:27017/shop')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

  
// Упрощённая регистрация (без хеширования)
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Регистрация:', { email, password }); // Логируем данные

    // Проверка существования пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Сохраняем пароль в открытом виде (ВРЕМЕННО!)
    const user = new User({ email, password });
    await user.save();
    console.log('Пользователь сохранён:', user);

    res.status(201).json({ 
      userId: user._id,
      email: user.email,
      message: 'Регистрация успешна' 
    });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ message: 'Ошибка регистрации' });
  }
});

// Упрощённый вход (без bcrypt)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Вход:', { email, password }); // Логируем данные

    const user = await User.findOne({ email });
    console.log('Найден пользователь:', user);

    if (!user || user.password !== password) {
      console.log('Неверные данные');
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    res.json({ 
      userId: user._id,
      email: user.email,
      message: 'Вход выполнен' 
    });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ message: 'Ошибка входа' });
  }
});

app.listen(5000, () => console.log('Сервер запущен на порту 5000'));