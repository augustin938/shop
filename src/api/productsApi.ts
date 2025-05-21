import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('https://api.example.com/products');
  return response.data;
};