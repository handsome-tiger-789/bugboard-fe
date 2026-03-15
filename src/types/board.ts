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

export interface BoardCreateResponse {
  boardId: number;
}

export interface BoardUpdateRequest {
  title: string;
  content: string;
}

export interface CommentResponse {
  id: number;
  boardId: number;
  usersId: number;
  nickname: string;
  content: string;
  likeCount: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateRequest {
  content: string;
}

export interface CommentUpdateRequest {
  content: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
}
