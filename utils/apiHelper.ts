import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  async getAllPosts() {
    return this.request.get('/posts');
  }

  async getPostById(id: number) {
    return this.request.get(`/posts/${id}`);
  }

  async createPost(data: object) {
    return this.request.post('/posts', { data });
  }

  async updatePost(id: number, data: object) {
    return this.request.put(`/posts/${id}`, { data });
  }

  async deletePost(id: number) {
    return this.request.delete(`/posts/${id}`);
  }

  async getAllUsers() {
    return this.request.get('/users');
  }
}