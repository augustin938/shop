const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email обязателен'], 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Некорректный формат email'] // Улучшенная валидация email
  },
  password: { 
    type: String, 
    required: [true, 'Пароль обязателен'],
    minlength: [6, 'Пароль должен содержать минимум 6 символов'] // Минимальная длина пароля
  }
});

// Удаляем хеширование пароля

module.exports = mongoose.model('User', UserSchema);
