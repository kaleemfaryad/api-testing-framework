import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  async getAllProducts() {
    return this.request.get('/products');
  }

  async getProductById(id: number) {
    return this.request.get(`/products/${id}`);
  }

  async createProduct(data: object) {
    return this.request.post('/products', { data });
  }

  async updateProduct(id: number, data: object) {
    return this.request.put(`/products/${id}`, { data });
  }

  async deleteProduct(id: number) {
    return this.request.delete(`/products/${id}`);
  }

  async getAllCategories() {
    return this.request.get('/products/categories');
  }
}