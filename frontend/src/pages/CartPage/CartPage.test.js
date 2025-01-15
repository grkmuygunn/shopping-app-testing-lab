import React from 'react'
import { render, screen } from '@testing-library/react'
import Cart from './CartPage'
import {
    yourCartTitle,
    emptyCartText,
    continueShoppingText,
    removeLabel,
    proceedLabel
} from '../constants'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { headerID } from '../../components/constants';


describe('CartPage', () => {

    const mockUpdateQuantity = jest.fn()
    const mockRemoveFromCart = jest.fn()

    const sampleCartItems = [
        { id: 1, title: 'Product 1', price: 10, quantity: 2, stock: 5, image_url: '/image1.jpg' },
        { id: 2, title: 'Product 2', price: 20, quantity: 1, stock: 2, image_url: '/image2.jpg' }
    ]

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('render header correctly', () => {
        render(
            <MemoryRouter>
                <Cart cartItems={[]} updateQuantity={mockUpdateQuantity} removeFromCart={mockRemoveFromCart} />
            </MemoryRouter>
        )
        const header = screen.getByTestId(headerID);
        expect(header).toBeInTheDocument();
    });

    it('renders empty cart message', () => {
        render(
            <MemoryRouter>
                <Cart cartItems={[]} updateQuantity={mockUpdateQuantity} removeFromCart={mockRemoveFromCart} />
            </MemoryRouter>
        )

        expect(screen.getByText(emptyCartText)).toBeInTheDocument()
        expect(screen.getByText(continueShoppingText)).toHaveAttribute('href', '/')
    });

    it('renders cart items and total price correctly', () => {
        render(
            <MemoryRouter>
                <Cart cartItems={sampleCartItems} updateQuantity={mockUpdateQuantity} removeFromCart={mockRemoveFromCart} />
            </MemoryRouter>
        )

        expect(screen.getByText(yourCartTitle)).toBeInTheDocument()
        expect(screen.getByText('Product 1')).toBeInTheDocument()
        expect(screen.getByText('$10.00')).toBeInTheDocument()
        expect(screen.getByText('Product 2')).toBeInTheDocument()
        expect(screen.getByText('Total: $40.00')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: proceedLabel })).toBeInTheDocument()
    });

    it('calls updateQuantity when quantity buttons are clicked', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <Cart cartItems={sampleCartItems} updateQuantity={mockUpdateQuantity} removeFromCart={mockRemoveFromCart} />
            </MemoryRouter>
        )
        const incrementButton = screen.getAllByText('+')[0]

        await user.click(incrementButton)
        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3)

        const decrementButton = screen.getAllByText('-')[0]
        await user.click(decrementButton)
        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1)
    });

    it('disables decrement button when the quantity is 1', async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <Cart cartItems={[{ id: 1, title: 'Product 1', price: 10, quantity: 1, stock: 2, image_url: '/image1.jpg' }]} updateQuantity={mockUpdateQuantity} removeFromCart={mockRemoveFromCart} />
            </MemoryRouter>
        )
        const decrementButton = screen.getByText('-')
        expect(decrementButton).toBeDisabled()
    });

    it('disables increment button when the quantity is at stock limit', async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <Cart cartItems={[{ id: 1, title: 'Product 1', price: 10, quantity: 5, stock: 5, image_url: '/image1.jpg' }]} updateQuantity={mockUpdateQuantity} removeFromCart={mockRemoveFromCart} />
            </MemoryRouter>
        )
        const decrementButton = screen.getByText('+')
        expect(decrementButton).toBeDisabled()
    });

    it('calls removeFromCart when remove button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <Cart cartItems={sampleCartItems} updateQuantity={mockUpdateQuantity} removeFromCart={mockRemoveFromCart} />
            </MemoryRouter>
        )
        const removeButton = screen.getAllByRole('button', { name: removeLabel })[0]
        await user.click(removeButton)

        expect(mockRemoveFromCart).toHaveBeenCalledWith(1)
    });
});