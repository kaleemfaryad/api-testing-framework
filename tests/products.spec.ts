import { test, expect } from '@playwright/test';
import { ApiHelper } from '../utils/apiHelper';

test.describe('Products API', () => {
  let apiHelper: ApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
  });

  test('get all products returns a non-empty array @smoke', async () => {
    const response = await apiHelper.getAllProducts();

    expect(response.status()).toBe(200);

    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
  });

  test('every product has required fields with correct types @regression', async () => {
    const response = await apiHelper.getAllProducts();
    const products = await response.json();

    for (const product of products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');

      expect(typeof product.title).toBe('string');
      expect(typeof product.price).toBe('number');
    }
  });

  test('get single product by id returns correct product @smoke', async () => {
    const response = await apiHelper.getProductById(1);

    expect(response.status()).toBe(200);

    const product = await response.json();
    expect(product.id).toBe(1);
  });

  test('create product returns submitted data @smoke', async () => {
    const newProduct = {
      title: 'Test Product',
      price: 29.99,
      category: 'test-category'
    };

    const response = await apiHelper.createProduct(newProduct);

    expect(response.status()).toBe(201); // fakestoreapi returns 201, not 200, on create

    const created = await response.json();
    expect(created.title).toBe(newProduct.title);
    expect(created.price).toBe(newProduct.price);
    expect(created).toHaveProperty('id');
  });

  test('update product returns updated fields @regression', async () => {
    const response = await apiHelper.updateProduct(1, {
      title: 'Updated Title',
      price: 99.99
    });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.title).toBe('Updated Title');
  });

  test('delete product returns success @regression', async () => {
    const response = await apiHelper.deleteProduct(1);

    expect(response.status()).toBe(200);
  });
});