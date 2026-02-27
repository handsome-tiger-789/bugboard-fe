export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCreateRequest {
  title: string;
  author: string;
  content: string;
}

export interface PostUpdateRequest {
  title: string;
  author: string;
  content: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
