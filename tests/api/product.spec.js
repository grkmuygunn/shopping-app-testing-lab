// @ts-check
import { test, expect } from "@playwright/test";

test.describe('Product API', () => {

    test('Get a single product', async ({ request }) => {
        const response = await request.get('http://localhost:4567/api/products/1');
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('id', 1);
        expect(data).toHaveProperty('title', 'Product 1');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('description');
    });

    test('Get product with invalid ID', async ({ request }) => {
        const response = await request.get('http://localhost:4567/api/products/9999');
        expect(response.status()).toBe(404);
    });
});