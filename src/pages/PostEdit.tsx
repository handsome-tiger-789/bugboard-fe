import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, updatePost } from '../api/postApi';
import styles from './PostEdit.module.css';

export default function PostEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPost(Number(id))
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setContent(res.data.content);
      })
      .catch(() => alert('게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!title.trim() || !author.trim() || !content.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    setSubmitting(true);
    try {
      await updatePost(Number(id), { title, author, content });
      navigate(`/posts/${id}`);
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
            {submitting ? '저장 중...' : '수정'}
          </button>
          <Link to={`/posts/${id}`} className={styles.cancelButton}>
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
