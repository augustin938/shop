import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css'; // Стили (создадим ниже)

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Переключение между входом/регистрацией
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Здесь будет запрос к API
  };

  return (
    <div className="auth">
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="switch">
        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </div>
    </div>
  );
};