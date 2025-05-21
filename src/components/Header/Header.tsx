import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { SearchBar } from '../SearchBar'; // Создадим позже

import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="logo">
          <h1>ShopName</h1>
        </Link>
        
        <SearchBar /> Поле поиска
        
        <nav>
          <Link to="/auth">Войти</Link>
          <Link to="/cart">Корзина (0)</Link>
        </nav>
      </div>
      
      {/* Горизонтальное меню категорий */}
      <div className="categories">
        <Link to="/catalog/electronics">Электроника</Link>
        <Link to="/catalog/clothes">Одежда</Link>
        <Link to="/catalog/books">Книги</Link>
      </div>
    </header>
  );
};

function useAuthStore(): { user: any; isAuthenticated: any; logout: any; } {
  throw new Error('Function not implemented.');
}
