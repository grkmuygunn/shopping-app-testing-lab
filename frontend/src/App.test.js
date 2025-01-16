import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { collectionTitle, postPurchaseText, shippingInfoText, yourCartTitle } from './pages/constants';
import axios from 'axios';
import { checkoutTitle } from './pages/CheckoutPage/constants';

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('App.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    it('renders the HomePage when navigating to /', async () => {
        await act(async () => {
            render(
                <App Router={({ children }) => <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>} />
            );
        });

        expect(screen.getByText(collectionTitle)).toBeInTheDocument();
    });


    it('renders the ProductDetailPage when navigating to /product/:id', async () => {
        const mockProduct = {
            id: 1,
            title: 'Mock Product',
            description: 'This is a mock product description',
            price: 100.00,
            stock: 10,
            image_url: 'https://via.placeholder.com/150',
        };
        axios.get.mockResolvedValueOnce({ data: mockProduct });

        await act(async () => {
            render(
                <App Router={({ children }) => <MemoryRouter initialEntries={['/product/1']}> {children} </MemoryRouter>} />);
        });

        expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    });

    it('displays an error message when API call fails for /product/:id', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch product details'));

        await act(async () => {
            render(
                <App Router={({ children }) => <MemoryRouter initialEntries={['/product/1']}>{children}</MemoryRouter>} />
            );
        });

        // Hata mesajının gösterildiğini doğrulayın
        expect(screen.getByText(/Failed to fetch product details/i)).toBeInTheDocument();
    });

    it('renders the CartPage when navigating to /cart', async () => {
        await act(async () => {
            render(
                <App Router={({ children }) => <MemoryRouter initialEntries={['/cart']}> {children} </MemoryRouter>} />
            );
        });

        expect(screen.getByText(yourCartTitle)).toBeInTheDocument();
    });


    it('renders the CheckoutPage when navigating to /checkout', async () => {
        await act(async () => {
            render(
                <App Router={({ children }) => <MemoryRouter initialEntries={['/checkout']}>{children}</MemoryRouter>} />
            );
        });
        expect(screen.getByText(checkoutTitle)).toBeInTheDocument();
    });

    it('renders the FinishPage when navigating to /finish', async () => {
        await act(async () => {
            render(
                <App Router={({ children }) => <MemoryRouter initialEntries={['/finish']}>{children}</MemoryRouter>} />
            );
        });

        expect(screen.getByText(postPurchaseText)).toBeInTheDocument();
        expect(screen.getByText(shippingInfoText)).toBeInTheDocument();
    });

    it('uses DefaultRouter when no Router is provided', async () => {
        await act(async () => {
            render(<App />);
        });

        expect(screen.getByText(collectionTitle)).toBeInTheDocument();
    });
});