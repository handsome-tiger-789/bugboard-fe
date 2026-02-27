import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPosts } from '../api/postApi';
import type { Post, PageResponse } from '../types/post';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import styles from './PostList.module.css';

const PAGE_SIZE = 10;

export default function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '0');
  const keyword = searchParams.get('keyword') || '';

  const [pageData, setPageData] = useState<PageResponse<Post> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPosts(currentPage, PAGE_SIZE, keyword || undefined)
      .then((res) => setPageData(res.data))
      .catch(() => alert('게시글 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [currentPage, keyword]);

  const handleSearch = (kw: string) => {
    setSearchParams(kw ? { keyword: kw, page: '0' } : { page: '0' });
  };

  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: String(page) };
    if (keyword) params.keyword = keyword;
    setSearchParams(params);
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <SearchBar onSearch={handleSearch} initialKeyword={keyword} />
        <Link to="/posts/new" className={styles.writeButton}>
          글쓰기
        </Link>
      </div>

      {loading ? (
        <p className={styles.message}>로딩 중...</p>
      ) : !pageData || pageData.content.length === 0 ? (
        <p className={styles.message}>게시글이 없습니다.</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colId}>번호</th>
                <th className={styles.colTitle}>제목</th>
                <th className={styles.colAuthor}>작성자</th>
                <th className={styles.colDate}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {pageData.content.map((post) => (
                <tr key={post.id}>
                  <td className={styles.colId}>{post.id}</td>
                  <td className={styles.colTitle}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td className={styles.colAuthor}>{post.author}</td>
                  <td className={styles.colDate}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={pageData.number}
            totalPages={pageData.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
