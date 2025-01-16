import { renderHook } from "@testing-library/react";
import { fetchProducts, fetchProduct, seedProducts } from './api';
import axios from 'axios';

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

describe('API functions', () => {
    const API_URL = 'http://localhost:4567/api';

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });


    describe('fetchProducts', () => {
        it('should fetch products successfully', async () => {
            const mockData = { products: [{ id: 1, name: 'Product 1' }] };
            axios.get.mockResolvedValueOnce({ data: mockData });

            const result = await fetchProducts();
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/products`, { params: { page: 1 } });
            expect(result).toEqual(mockData);
        });

        it('should throw an error if fetching products fails', async () => {
            const mockError = new Error('Network Error');
            axios.get.mockRejectedValueOnce(mockError);

            await expect(fetchProducts(1)).rejects.toThrow('Network Error');
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/products`, { params: { page: 1 } });
        });
    });

    describe('fetchProduct', () => {
        it('should fetch a product by ID successfully', async () => {
            const mockData = { products: [{ id: 1, name: 'Product 1' }] };
            axios.get.mockResolvedValueOnce({ data: mockData });

            const result = await fetchProduct(1);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/products/1`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if fetching product with id fails', async () => {
            const mockError = new Error('Product not found');
            axios.get.mockRejectedValueOnce(mockError);

            await expect(fetchProduct(99)).rejects.toThrow('Product not found');
            expect(console.error).toHaveBeenCalledWith(`Error fetching product with id 99:`, mockError);
            expect(axios.get).toHaveBeenCalledWith(`${API_URL}/products/99`);
        });
    });

    describe('seedProducts', () => {
        it('should seed products successfully', async () => {
            const mockData = { message: 'Seed successful' };
            axios.post.mockResolvedValueOnce({ data: mockData });

            const result = await seedProducts();

            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/seed`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if seeding products fails', async () => {
            const mockError = new Error('Seeding failed');
            axios.post.mockRejectedValueOnce(mockError);

            await expect(seedProducts()).rejects.toThrow('Seeding failed');
            expect(console.error).toHaveBeenCalledWith(`Error seeding products:`, mockError);
            expect(axios.post).toHaveBeenCalledWith(`${API_URL}/seed`);
        });
    });
});