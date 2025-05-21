import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { SearchBar } from '../SearchBar';
import { useAuthStore } from '../../store/authStore';

import './Header.css';

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="logo">
          <h1>FashionShop</h1>
        </Link>
        
        <SearchBar />
        
        <nav>
          {isAuthenticated ? (
            <Button onClick={logout}>Выйти</Button>
          ) : (
            <Link to="/auth">Войти</Link>
          )}
          <Link to="/cart">Корзина (0)</Link>
        </nav>
      </div>
      
      <div className="categories">
        <Link to="/catalog/men">Мужская одежда</Link>
        <Link to="/catalog/women">Женская одежда</Link>
        <Link to="/catalog/kids">Детская одежда</Link>
      </div>
    </header>
  );
};