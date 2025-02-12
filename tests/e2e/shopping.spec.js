// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test('Product Listing', async ({ page }) => {
    const product1 = await page.getByTestId('product-card').first();
    await expect(product1).toBeVisible();
    const product2 = await page.getByTestId('product-card').nth(1);
    await expect(product2).toBeVisible();
});

test('Product Details Page', async ({ page }) => {
    const product1 = await page.getByTestId('product-card').first();
    await product1.click();
    const productDescription = await page.getByTestId('product-detail-description');
    await expect(productDescription).toBeVisible();
});

test('Add products to the cart', async ({ page }) => {

    const addToCartButtonProduct1 = await page.getByTestId('add-to-cart-button').first();
    await addToCartButtonProduct1.click();

    const addToCartButtonProduct2 = await page.getByTestId('add-to-cart-button').first();
    await addToCartButtonProduct2.click();

    const cartLink = await page.getByTestId('cart-link');
    await expect(cartLink).toHaveText('Cart2');

    const product1 = await page.getByTestId('product-card').first();
    await product1.click();

    const plusButton = await page.getByRole('button', { name: '+' });
    await plusButton.click();
    await expect(cartLink).toHaveText('Cart3');

    await cartLink.click();
    const cartItemProduct1 = await page.getByTestId('cart-item-title').first();
    await expect(cartItemProduct1).toBeVisible();
    const cartItemProduct2 = await page.getByTestId('cart-item-title').nth(1);
    await expect(cartItemProduct2).toBeVisible();
});

test('Adding and remove products in the cart page', async ({ page }) => {

    const addToCartButtonProduct1 = await page.getByTestId('add-to-cart-button').first();
    await addToCartButtonProduct1.click();

    const cartLink = await page.getByTestId('cart-link');
    await cartLink.click();

    const incrementButton = await page.getByRole('button', { name: '+' });
    await incrementButton.click();
    await expect(cartLink).toHaveText('Cart2');

    const cartItemProduct1 = await page.getByTestId('cart-item-title')
    await expect(cartItemProduct1).toBeVisible();

    const removeButton = await page.getByTestId('remove-item');
    await removeButton.click();
    const emptyCartMessage = await page.getByTestId('cart-empty-message');
    await expect(emptyCartMessage).toBeVisible();

});

test('Checkout Process', async ({ page }) => {
    const addToCartButtonProduct1 = await page.getByTestId('add-to-cart-button').first();
    await addToCartButtonProduct1.click();

    const cartLink = await page.getByTestId('cart-link');
    await cartLink.click();

    const checkoutButton = await page.getByTestId('proceed-to-checkout');
    await checkoutButton.click();

    const checkoutForm = await page.getByTestId('checkout-form');
    await expect(checkoutForm).toBeVisible();

    await page.fill('[data-testid="checkout-name"]', 'John');
    await page.fill('[data-testid="checkout-surname"]', 'Doe');
    await page.fill('[data-testid="checkout-address"]', '123 Main St');
    await page.selectOption('[data-testid="checkout-country"]', 'USA');
    await page.check('[data-testid="checkout-acknowledgment"]');

    const checkoutSubmitButton = await page.getByTestId('checkout-submit');
    await checkoutSubmitButton.click();

    const finishPage = await page.getByTestId('finish-page');
    await expect(finishPage).toBeVisible();
});

test('API Response', async ({ page }) => {
    const response = await page.waitForResponse('http://localhost:4567/api/products?page=1');
    await expect(response.status()).toBe(200);
});