import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoard, deleteBoard } from '../api/boardApi';
import type { BoardResponse } from '../types/board';
import styles from './BoardDetail.module.css';

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBoard(Number(id))
      .then((res) => setBoard(res.data))
      .catch(() => alert('게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteBoard(Number(id));
      navigate('/');
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  if (loading) return <p className={styles.message}>로딩 중...</p>;
  if (!board) return <p className={styles.message}>게시글을 찾을 수 없습니다.</p>;

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{board.title}</h1>
      <div className={styles.meta}>
        <span>작성자: {board.nickname}</span>
        <span>조회수: {board.viewCount}</span>
        <span>작성일: {new Date(board.createdAt).toLocaleDateString()}</span>
        {board.updatedAt !== board.createdAt && (
          <span>수정일: {new Date(board.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
      <div className={styles.content}>{board.content}</div>
      <div className={styles.actions}>
        <Link to={`/boards/${board.id}/edit`} className={styles.editButton}>
          수정
        </Link>
        <button onClick={handleDelete} className={styles.deleteButton}>
          삭제
        </button>
        <Link to="/" className={styles.backButton}>
          목록
        </Link>
      </div>
    </article>
  );
}
