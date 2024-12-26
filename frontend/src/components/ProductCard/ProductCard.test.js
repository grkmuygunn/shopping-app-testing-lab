import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { addToCartTitle, outOfStockTitle } from '../constants'
import ProductCard from './ProductCard';

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('ProductCard', () => {
    const user = userEvent.setup();

    const productInStock = {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        stock: 10,
        image_url: 'https://example.com/product.jpg'
    }

    const productOutOfStock = {
        ...productInStock,
        stock: 0,
    }

    const cartItems = [{ id: 1, quantity: 2 }];

    const addToCartMock = jest.fn()

    const renderProductCard = (product, cartItems = []) => {
        render(
            <MemoryRouter>
                <ProductCard product={product} addToCart={addToCartMock} cartItems={cartItems} />
            </MemoryRouter>
        )
    }

    it('renders Product card correctly with its elemenets', () => {
        renderProductCard(productInStock);

        expect(screen.getByRole('img', { name: productInStock.title })).toHaveAttribute(
            'src',
            productInStock.image_url
        );
        expect(screen.getByText('$99.99')).toBeInTheDocument()
        expect(screen.getByText(productInStock.title)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: addToCartTitle })).toBeInTheDocument()
    })

    it('displays Add to Cart button when product is not in the cart', () => {
        renderProductCard(productInStock);

        const addToCartButton = screen.getByRole('button', { name: addToCartTitle });
        expect(addToCartButton).toBeEnabled();
    })

    it('displays disabled Out of Stock button when product is out of stock', () => {
        renderProductCard(productOutOfStock);

        const outOfStockButton = screen.getByRole('button', { name: outOfStockTitle })
        expect(outOfStockButton).toBeDisabled()
    })

    it('calls addToCart and does not navigate when Add to Cart button is clicked', async () => {
        renderProductCard(productInStock);

        const addToCartButton = screen.getByRole('button', { name: addToCartTitle });
        await user.click(addToCartButton);

        expect(addToCartMock).toHaveBeenCalledWith(productInStock);
        expect(mockNavigate).not.toHaveBeenCalled();
    })

    it('shows QuantitySelector when product is in the cart', () => {
        renderProductCard(productInStock, cartItems)
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()
    })

    it('calls addToCart with decrement when QuantitySelector decrease is clicked', async () => {
        renderProductCard(productInStock, cartItems);

        const decreaseButton = screen.getByRole('button', { name: '-' });
        await user.click(decreaseButton);

        expect(addToCartMock).toHaveBeenCalledWith(productInStock, -1);
    });

    it('navigates to product details page when card is clicked', async () => {
        renderProductCard(productInStock);

        const cardElement = screen.getByRole('img', { name: productInStock.title }).closest('div');
        await user.click(cardElement);

        expect(mockNavigate).toHaveBeenCalledWith(`/product/${productInStock.id}`);
    });

    it('calls addToCart when QuantitySelector increase button is clicked', async () => {
        renderProductCard(productInStock, cartItems);

        const increaseButton = screen.getByRole('button', { name: '+' });
        await user.click(increaseButton);

        expect(addToCartMock).toHaveBeenCalledWith(productInStock);
    });
});
