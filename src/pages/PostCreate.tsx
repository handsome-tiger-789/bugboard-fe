import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../api/postApi';
import styles from './PostCreate.module.css';

export default function PostCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await createPost({ title, author, content });
      navigate(`/posts/${res.data.id}`);
    } catch {
      alert('게시글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>게시글 작성</h1>
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
          작성자
          <input
            type="text"
            className={styles.input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
