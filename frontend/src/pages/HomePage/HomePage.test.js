import React, { act } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { headerID } from '../../components/constants'
import HomePage from './HomePage';
import { fetchProducts } from '../../services/api'
import {
    firstPageNavID,
    prevPageNavID,
    nextPageNavID,
    lastPageNavID
} from '../../components/constants'

jest.mock('../../services/api', () => ({
    fetchProducts: jest.fn()
}))

describe('HomePage', () => {

    const mockProducts = [
        { id: 1, title: 'Product 1', price: 10, stock: 5 },
        { id: 2, title: 'Product 2', price: 20, stock: 2 },
    ]


    const mockCartItems = [{ id: 1, quantity: 2 }]
    const mockAddToCart = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders header', async () => {
        fetchProducts.mockResolvedValueOnce({ products: mockProducts })

        await act(async () => {
            render(
                <MemoryRouter>
                    <HomePage addToCart={mockAddToCart} cartItems={mockCartItems} />
                </MemoryRouter>
            )
        });
        const header = screen.getByTestId(headerID);
        expect(header).toBeInTheDocument()
    });

    it('should render the loading state initially', async () => {
        fetchProducts.mockImplementationOnce(() =>
            new Promise((resolve) => {
                setTimeout(() => resolve({ products: [] }), 100)
            })
        );

        render(
            <MemoryRouter>
                <HomePage addToCart={mockAddToCart} cartItems={mockCartItems} />
            </MemoryRouter>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

    });


    it('should render products on successful fetch', async () => {

        fetchProducts.mockResolvedValueOnce({ products: mockProducts })

        await act(async () => {
            render(
                <MemoryRouter>
                    <HomePage cartItems={mockCartItems} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        })

        expect(screen.getByText('Product 1')).toBeInTheDocument()
        expect(screen.getByText('Product 2')).toBeInTheDocument()
    });

    it('should render an error message when fetch fails ', async () => {
        fetchProducts.mockRejectedValueOnce(new Error('API Error'));

        await act(async () => {
            render(
                <MemoryRouter>
                    <HomePage cartItems={mockCartItems} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });

        expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
    });

    it('should render pagination when multiple pages are available', async () => {
        const mockDynamicProducts = new Array(15).fill(null).map((_, i) => ({
            id: i + 1,
            name: `Product ${i + 1}`,
            price: 20
        }));

        fetchProducts.mockResolvedValueOnce({ products: mockDynamicProducts })

        await act(async () => {
            render(
                <MemoryRouter>
                    <HomePage cartItems={mockCartItems} addToCart={mockAddToCart} />
                </MemoryRouter>
            )
        });

        expect(screen.getByTestId(firstPageNavID)).toBeInTheDocument()
        expect(screen.getByTestId(prevPageNavID)).toBeInTheDocument()
        expect(screen.getByTestId(nextPageNavID)).toBeInTheDocument()
        expect(screen.getByTestId(lastPageNavID)).toBeInTheDocument()
    });
});