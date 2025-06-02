import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tu-backend.onrender.com' 
  : 'http://localhost:5000';

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
