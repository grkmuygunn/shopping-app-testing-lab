import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useCart } from './useCart';

describe('useCart', () => {
    let result;
    let product;

    beforeEach(() => {
        const hook = renderHook(() => useCart());
        result = hook.result;

        product = { id: 1, title: 'Test Product', stock: 5 };
    });


    it('returns an empty cart initially', () => {
        expect(result.current.cartItems).toEqual([]);
    });

    it('adds a product to the cart', () => {

        act(() => {
            result.current.addToCart(product, 2);
        });

        expect(result.current.cartItems).toEqual([{ ...product, quantity: 2 }]);
    });

    it('updates quantity when the same product is added again', () => {

        act(() => {
            result.current.addToCart(product, 2);
            result.current.addToCart(product, 2);
        });

        expect(result.current.cartItems).toEqual([{ ...product, quantity: 4 }]);
    });

    it('removes a product from the cart if quantity becomes 0', () => {

        act(() => {
            result.current.addToCart(product, 2);
            result.current.addToCart(product, -2);
        });

        expect(result.current.cartItems).toEqual([]);
    });

    it('updates the quantity of a product', () => {

        act(() => {
            result.current.addToCart(product, 2);
            result.current.updateQuantity(1, 3);
        });

        expect(result.current.cartItems).toEqual([{ ...product, quantity: 3 }]);
    });

    it('removes a product from the cart', () => {

        act(() => {
            result.current.addToCart(product, 2);
            result.current.removeFromCart(1);
        });

        expect(result.current.cartItems).toEqual([]);
    });

    it('does nothing when removing a product not in the cart', () => {

        act(() => {
            result.current.removeFromCart(1);
        });

        expect(result.current.cartItems).toEqual([]);
    });
});
