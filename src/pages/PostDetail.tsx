import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost } from '../api/postApi';
import type { Post } from '../types/post';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPost(Number(id))
      .then((res) => setPost(res.data))
      .catch(() => alert('게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deletePost(Number(id));
      navigate('/');
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  if (loading) return <p className={styles.message}>로딩 중...</p>;
  if (!post) return <p className={styles.message}>게시글을 찾을 수 없습니다.</p>;

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <span>작성자: {post.author}</span>
        <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
        {post.updatedAt !== post.createdAt && (
          <span>수정일: {new Date(post.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
      <div className={styles.content}>{post.content}</div>
      <div className={styles.actions}>
        <Link to={`/posts/${post.id}/edit`} className={styles.editButton}>
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
