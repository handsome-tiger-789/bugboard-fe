import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { createBoard } from '../api/boardApi';
import type { ErrorResponse } from '../types/board';
import styles from './BoardCreate.module.css';

const TITLE_MAX_LENGTH = 50;

export default function BoardCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await createBoard({ title, content });
      navigate(`/boards/${res.data.boardId}`, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as ErrorResponse;
        setError(data.message);
      } else {
        setError('게시글 작성에 실패했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>게시글 작성</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          제목
          <input
            type="text"
            className={styles.input}
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className={styles.charCount}>{title.length}/{TITLE_MAX_LENGTH}</span>
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
            {submitting ? '저장 중...' : '작성'}
          </button>
          <Link to="/" className={styles.cancelButton}>
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
