// @ts-check
import { test, expect } from "@playwright/test";

test.describe('Database Seeding API', () => {
    test('Seed the database with products', async ({ request }) => {
        const response = await request.post('http://localhost:4567/api/seed');
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('message', '50 sample products inserted');
    });
});