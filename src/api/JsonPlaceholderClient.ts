import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { ListQuery, NewPost, Post } from './types';

/**
 * Thin client for the JSONPlaceholder REST API.
 *
 * Methods return the raw {@link APIResponse} so specs can assert on status
 * codes, headers and bodies. Paths are relative and resolved against the
 * `baseURL` of the `api` project in playwright.config.ts.
 */
export class JsonPlaceholderClient {
  constructor(private readonly request: APIRequestContext) {}

  // Posts
  getPosts(query?: ListQuery): Promise<APIResponse> {
    return this.request.get('/posts', { params: query });
  }

  getPost(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }

  getPostComments(postId: number): Promise<APIResponse> {
    return this.request.get(`/posts/${postId}/comments`);
  }

  createPost(post: NewPost): Promise<APIResponse> {
    return this.request.post('/posts', { data: post });
  }

  replacePost(id: number, post: Post): Promise<APIResponse> {
    return this.request.put(`/posts/${id}`, { data: post });
  }

  updatePost(id: number, changes: Partial<NewPost>): Promise<APIResponse> {
    return this.request.patch(`/posts/${id}`, { data: changes });
  }

  deletePost(id: number): Promise<APIResponse> {
    return this.request.delete(`/posts/${id}`);
  }

  // Users
  getUsers(): Promise<APIResponse> {
    return this.request.get('/users');
  }

  getUser(id: number): Promise<APIResponse> {
    return this.request.get(`/users/${id}`);
  }

  getUserPosts(userId: number): Promise<APIResponse> {
    return this.request.get(`/users/${userId}/posts`);
  }

  getUserTodos(userId: number, query?: ListQuery): Promise<APIResponse> {
    return this.request.get(`/users/${userId}/todos`, { params: query });
  }

  // Albums
  getAlbumPhotos(albumId: number): Promise<APIResponse> {
    return this.request.get(`/albums/${albumId}/photos`);
  }
}
