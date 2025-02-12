import { request } from '@playwright/test';

export default async function globalSetup() {
  const apiRequest = await request.newContext();
  console.log("Database seeding");
  await apiRequest.post('http://localhost:4567/api/seed');
  console.log("Database seeded!");
}