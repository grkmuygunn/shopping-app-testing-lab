import axios from 'axios';

const API_URL = 'http://localhost:4567/api';

export const fetchProducts = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/products`, { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const seedProducts = async () => {
  try {
    const response = await axios.post(`${API_URL}/seed`);
    return response.data;
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};