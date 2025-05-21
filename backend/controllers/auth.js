const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Создаем нового пользователя без хеширования пароля
    const user = new User({ email, password, name });
    await user.save();

    res.status(201).json({ message: 'Регистрация успешна', user: { email, name } });
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при регистрации: ' + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    res.json({ message: 'Вход успешен', user: { email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера: ' + err.message });
  }
};