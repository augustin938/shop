import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import { Auth } from './pages/Auth/Auth';

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Auth/>}/>
    </Routes>
  );
}