import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import './Catalog.css';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data: Product[] = await response.json();
          setProducts(data);
        } else {
          throw new Error("Received non-JSON response");
        }
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="catalog">
      <h2>Каталог одежды</h2>
      <AddProductForm />
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;