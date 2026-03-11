# BugBoard Frontend

React + TypeScript 기반의 게시판 프론트엔드 프로젝트입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 빌드 도구 | Vite 7 |
| 언어 | TypeScript 5 |
| UI | React 19 |
| 라우팅 | React Router v7 |
| HTTP 클라이언트 | Axios |
| 스타일링 | CSS Modules |

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm 9+

### 설치

```bash
npm install
```

### 환경변수

`.env` 파일에서 백엔드 API URL을 설정합니다.

```
VITE_API_URL=/api
```

> Vite 프록시가 `/api` 요청을 `http://localhost:8080`으로 전달합니다.

### 실행

```bash
# 개발 서버 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## 디렉토리 구조

```
src/
├── api/
│   └── boardApi.ts              # 게시글 API 호출 함수
├── components/
│   ├── Layout.tsx               # 공통 레이아웃 (헤더, 푸터)
│   ├── Layout.module.css
│   ├── Pagination.tsx           # 페이지네이션
│   ├── Pagination.module.css
│   ├── SearchBar.tsx            # 검색바
│   └── SearchBar.module.css
├── pages/
│   ├── BoardList.tsx            # 게시글 목록
│   ├── BoardList.module.css
│   ├── BoardDetail.tsx          # 게시글 상세
│   ├── BoardDetail.module.css
│   ├── BoardCreate.tsx          # 게시글 작성
│   ├── BoardCreate.module.css
│   ├── BoardEdit.tsx            # 게시글 수정
│   └── BoardEdit.module.css
├── types/
│   └── board.ts                 # 타입 정의
├── App.tsx                      # 라우터 설정
├── App.module.css
├── main.tsx                     # 엔트리 포인트
└── index.css                    # 글로벌 스타일
```

## 라우트

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | BoardList | 게시글 목록 (페이지네이션, 검색) |
| `/boards/new` | BoardCreate | 게시글 작성 |
| `/boards/:id` | BoardDetail | 게시글 상세 (수정/삭제) |
| `/boards/:id/edit` | BoardEdit | 게시글 수정 |

## API

`boardApi.ts`에서 다음 함수를 제공합니다.

| 함수 | HTTP | 설명 |
|------|------|------|
| `getBoards(page, size, keyword?)` | GET /api/boards | 목록 조회 |
| `getBoard(id)` | GET /api/boards/:id | 상세 조회 |
| `createBoard(data)` | POST /api/boards | 생성 |
| `updateBoard(id, data)` | PUT /api/boards/:id | 수정 |
| `deleteBoard(id)` | DELETE /api/boards/:id | 삭제 |

### 요청 헤더

모든 요청에 다음 인증 헤더가 포함됩니다. (현재 테스트용 고정값)

| 헤더 | 값 |
|------|-----|
| `X-User-Id` | 1 |
| `X-User-Name` | testuser |
| `X-User-Email` | testuser@example.com |

## 주요 기능

- 게시글 CRUD (작성, 조회, 수정, 삭제)
- 페이지네이션 (페이지 번호 기반)
- 제목 키워드 검색
- 조회수 표시
- URL 쿼리 파라미터 기반 상태 관리 (`?page=0&keyword=검색어`)
- 요청/응답 콘솔 로깅 (디버깅용)
