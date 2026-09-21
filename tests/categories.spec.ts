import { test, expect } from '@playwright/test';
import { ApiHelper } from '../utils/apiHelper';

test('get all categories returns non-empty array of strings @smoke', async ({ request }) => {
  const apiHelper = new ApiHelper(request);
  const response = await apiHelper.getAllCategories();

  expect(response.status()).toBe(200);

  const categories = await response.json();
  expect(Array.isArray(categories)).toBeTruthy();
  expect(categories.length).toBeGreaterThan(0);

  categories.forEach((category: unknown) => {
    expect(typeof category).toBe('string');
  });
});