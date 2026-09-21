import { test, expect } from '@playwright/test';
import { ApiHelper } from '../utils/apiHelper';

test('get all users returns non-empty array with valid emails @smoke', async ({ request }) => {
  const apiHelper = new ApiHelper(request);
  const response = await apiHelper.getAllUsers();

  expect(response.status()).toBe(200);

  const users = await response.json();
  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);

  users.forEach((user: any) => {
    expect(user).toHaveProperty('email');
    expect(user.email).toContain('@'); // basic email format sanity check
  });
});