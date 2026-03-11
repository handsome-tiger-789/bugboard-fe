import axios from 'axios';
import type { BoardResponse, BoardListResponse, BoardCreateRequest, BoardCreateResponse, BoardUpdateRequest } from '../types/board';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-User-Id': '1',
    'X-User-Name': 'testuser',
    'X-User-Email': 'testuser@example.com',
  },
});

api.interceptors.request.use((config) => {
  console.log(`[REQ] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
    params: config.params,
    data: config.data,
    headers: config.headers,
  });
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`[RES] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`[ERR] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  },
);

export function getBoards(page: number, size: number, title?: string) {
  return api.get<BoardListResponse>('/boards', {
    params: { page, size, title },
  });
}

export function getBoard(id: number) {
  return api.get<BoardResponse>(`/boards/${id}`);
}

export function createBoard(data: BoardCreateRequest) {
  return api.post<BoardCreateResponse>('/boards', data);
}

export function updateBoard(id: number, data: BoardUpdateRequest) {
  return api.put<BoardResponse>(`/boards/${id}`, data);
}

export function deleteBoard(id: number) {
  return api.delete<void>(`/boards/${id}`);
}
