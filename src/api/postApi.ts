import axios from 'axios';
import type { Post, PostCreateRequest, PostUpdateRequest, PageResponse } from '../types/post';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function getPosts(page: number, size: number, keyword?: string) {
  return api.get<PageResponse<Post>>('/posts', {
    params: { page, size, keyword },
  });
}

export function getPost(id: number) {
  return api.get<Post>(`/posts/${id}`);
}

export function createPost(data: PostCreateRequest) {
  return api.post<Post>('/posts', data);
}

export function updatePost(id: number, data: PostUpdateRequest) {
  return api.put<Post>(`/posts/${id}`, data);
}

export function deletePost(id: number) {
  return api.delete<void>(`/posts/${id}`);
}
