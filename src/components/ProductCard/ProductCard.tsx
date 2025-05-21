import { Link } from 'react-router-dom';
import './ProductCard.css'

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

export const ProductCard = ({ id, title, price, image }: ProductCardProps) => {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{price} ₽</p>
        <button>В корзину</button>
      </Link>
    </div>
  );
};