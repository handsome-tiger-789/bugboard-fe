export interface BoardResponse {
  id: number;
  usersId: number;
  nickname: string;
  title: string;
  content: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BoardListResponse {
  boards: BoardResponse[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

export interface BoardCreateRequest {
  title: string;
  content: string;
}

export interface BoardUpdateRequest {
  title: string;
  content: string;
}
