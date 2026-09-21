import { test, expect } from '@playwright/test';
import { ApiHelper } from '../utils/apiHelper';

test.describe('Posts API', () => {
  let apiHelper: ApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
  });

  test('get all posts returns a non-empty array @smoke', async () => {
    const response = await apiHelper.getAllPosts();

    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
  });

  test('every post has required fields with correct types @regression', async () => {
    const response = await apiHelper.getAllPosts();
    const posts = await response.json();

    for (const post of posts) {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
      expect(post).toHaveProperty('userId');

      expect(typeof post.title).toBe('string');
      expect(typeof post.userId).toBe('number');
    }
  });

  test('get single post by id returns correct post @smoke', async () => {
    const response = await apiHelper.getPostById(1);

    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.id).toBe(1);
  });

  test('create post returns submitted data @smoke', async () => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1
    };

    const response = await apiHelper.createPost(newPost);

    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created.title).toBe(newPost.title);
    expect(created.body).toBe(newPost.body);
    expect(created).toHaveProperty('id');
  });

  test('update post returns updated fields @regression', async () => {
    const response = await apiHelper.updatePost(1, {
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.title).toBe('Updated Title');
  });

  test('delete post returns success @regression', async () => {
    const response = await apiHelper.deletePost(1);

    expect(response.status()).toBe(200);
  });
});