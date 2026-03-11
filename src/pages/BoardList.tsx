import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getBoards } from '../api/boardApi';
import type { BoardListResponse } from '../types/board';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import styles from './BoardList.module.css';

const PAGE_SIZE = 10;

export default function BoardList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '0');
  const title = searchParams.get('title') || '';

  const [pageData, setPageData] = useState<BoardListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBoards(currentPage, PAGE_SIZE, title || undefined)
      .then((res) => setPageData(res.data))
      .catch(() => alert('게시글 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [currentPage, title]);

  const handleSearch = (kw: string) => {
    setSearchParams(kw ? { title: kw, page: '0' } : { page: '0' });
  };

  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: String(page) };
    if (title) params.title = title;
    setSearchParams(params);
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <SearchBar onSearch={handleSearch} initialKeyword={title} />
        <Link to="/boards/new" className={styles.writeButton}>
          글쓰기
        </Link>
      </div>

      {loading ? (
        <p className={styles.message}>로딩 중...</p>
      ) : !pageData || pageData.boards.length === 0 ? (
        <p className={styles.message}>게시글이 없습니다.</p>
      ) : (
        <>
          <p className={styles.totalCount}>전체 {pageData.totalCount}건</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colId}>번호</th>
                <th className={styles.colTitle}>제목</th>
                <th className={styles.colAuthor}>작성자</th>
                <th className={styles.colViewCount}>조회수</th>
                <th className={styles.colDate}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {pageData.boards.map((board) => (
                <tr key={board.id}>
                  <td className={styles.colId}>{board.id}</td>
                  <td className={styles.colTitle}>
                    <Link to={`/boards/${board.id}`}>{board.title}</Link>
                  </td>
                  <td className={styles.colAuthor}>{board.nickname}</td>
                  <td className={styles.colViewCount}>{board.viewCount}</td>
                  <td className={styles.colDate}>
                    {new Date(board.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={pageData.page}
            totalPages={pageData.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
