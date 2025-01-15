import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductDetail from './ProductDetailPage';
import { loadingLabel, productNotFoundError, backToHomepageLabel } from '../constants'
import { addToCartTitle, outOfStockTitle } from '../../components/constants';
import { headerID } from '../../components/constants';

jest.mock('axios', () => ({
    get: jest.fn(),
}));

import axios from 'axios';
import { act } from 'react';

describe('ProductDetailPage', () => {
    const mockProduct = {
        id: 1,
        title: 'Product 1',
        description: 'This is the description for product 1',
        price: 19.99,
        stock: 5,
        image_url: 'https://example.com/product.jpg',
    };
    const mockOutOfStockProduct = {
        id: 2,
        title: 'Product 2',
        description: 'This is the description for product 1',
        price: 19.99,
        stock: 0,
        image_url: 'https://example.com/product.jpg',
    };

    const mockAddToCart = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('renders header correctly', async () => {

        axios.get.mockResolvedValueOnce({ data: mockProduct });

        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });

        const header = screen.getByTestId(headerID);
        expect(header).toBeInTheDocument()
    });

    it('displays loading state initially', async () => {
        axios.get.mockImplementationOnce(() =>
            new Promise((resolve) => {
                setTimeout(() => resolve({}), 100)
            })
        );

        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });
        expect(screen.getByText(loadingLabel)).toBeInTheDocument();
    });

    it('displays error message when API call fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('API error'));

        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });

        const errorMessage = await screen.findByText('Failed to fetch product details');
        expect(errorMessage).toBeInTheDocument();
    });

    it('renders component elements correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: mockProduct });
        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });

        expect(screen.getByRole('img', { name: 'Product 1' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: '← ' + backToHomepageLabel })).toBeInTheDocument()
        expect(screen.getByText('This is the description for product 1')).toBeInTheDocument()
        expect(screen.getByText('$19.99')).toBeInTheDocument()
        expect(screen.getByText('In stock: 5')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: addToCartTitle })).toBeInTheDocument()
    });

    it('displays error when product is not found', async () => {
        axios.get.mockResolvedValueOnce({});
        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });
        expect(screen.getByText(productNotFoundError)).toBeInTheDocument()
    });

    it('calls addToCart() when Add To Cart button is clicked', async () => {
        const user = userEvent.setup()
        axios.get.mockResolvedValueOnce({ data: mockProduct });
        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });
        await user.click(screen.getByRole('button', { name: addToCartTitle }))
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
    });

    it('displays QuantitySelector when product is in the cart ', async () => {
        axios.get.mockResolvedValueOnce({ data: mockProduct });
        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[{ id: 1, quantity: 2 }]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getAllByText('2')[1]).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()
    });

    it('calls increment and discrement functions correctly when quantity buttons are clicked ', async () => {
        const user = userEvent.setup()
        axios.get.mockResolvedValueOnce({ data: mockProduct });
        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[{ id: 1, quantity: 2 }]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });
        await user.click(screen.getByRole('button', { name: '+' }))
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
        await user.click(screen.getByRole('button', { name: '-' }))
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, -1)
    });

    it('displays disabled Out of Stock button when product is out of stock ', async () => {
        axios.get.mockResolvedValueOnce({ data: mockOutOfStockProduct });
        await act(async () => {
            render(
                <MemoryRouter>
                    <ProductDetail cartItems={[{ id: 1, quantity: 2 }]} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });
        const outOfStockButton = screen.getByRole('button', { name: outOfStockTitle })
        expect(outOfStockButton).toBeDisabled()
    });
});