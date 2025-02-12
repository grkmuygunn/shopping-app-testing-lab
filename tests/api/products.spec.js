// @ts-check
import { test, expect } from "@playwright/test";

test.describe('Products API', () => {

    test('Get all products', async ({ request }) => {
        const response = await request.get('http://localhost:4567/api/products');
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.products.length).toBeGreaterThan(0);
        expect(data).toHaveProperty('products');
    });
});