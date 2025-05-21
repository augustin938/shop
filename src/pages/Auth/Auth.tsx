import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Auth.css';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register, isAuthenticated} = useAuthStore();
  
  
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Проверка заполненности полей
  if (!email.trim() || !password.trim()) {
    setError('Заполните все поля');
    return;
  }

  try {
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password);
    }
    navigate('/');
  } catch (err) {
    console.error('Ошибка формы:', err);
  }
};

  if (isAuthenticated) {
    return (
      <div className="auth">
        <h2>Вы уже авторизованы</h2>
        <Link to="/">На главную</Link>
      </div>
    );
  }

  return (
    <div className="auth">
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      {error && <div className="error">{error}</div>}
      
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
          minLength={6}
        />
        
        <button type="submit">
        {isLogin ? "Войти" : "Зарегатся"}
        </button>
      </form>

      <div className="switch">
        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
        <button 
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </div>
    </div>
  );
};