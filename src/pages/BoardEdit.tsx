import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoard, updateBoard } from '../api/boardApi';
import styles from './BoardEdit.module.css';

export default function BoardEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getBoard(Number(id))
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(() => alert('게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    if (!title.trim() || !content.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    setSubmitting(true);
    try {
      await updateBoard(Number(id), { title, content });
      navigate(`/boards/${id}`);
    } catch {
      alert('게시글 수정에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className={styles.message}>로딩 중...</p>;

  return (
    <div>
      <h1 className={styles.heading}>게시글 수정</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          제목
          <input
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          내용
          <textarea
            className={styles.textarea}
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? '저장 중...' : '수정'}
          </button>
          <Link to={`/boards/${id}`} className={styles.cancelButton}>
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
