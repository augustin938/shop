import { Header } from '../../components/Header/Header';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './Home.css'

// Временные данные (позже заменим на API)
const mockProducts = [
  { id: '1', title: 'iPhone 15', price: 89990, image: '/assets/images/iphone.jpg' },
  { id: '2', title: 'MacBook Pro', price: 129990, image: '/images/macbook.jpg' },
];

const Home = () => {
  return (
    <div className="home">
      <Header />
      
      <main>
        <h2>Популярные товары</h2>
        
        <div className="products-grid">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home