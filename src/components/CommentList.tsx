import { useEffect, useState } from 'react';
import axios from 'axios';
import { getComments, createComment, updateComment, deleteComment, CURRENT_USER_ID } from '../api/boardApi';
import type { CommentResponse, ErrorResponse } from '../types/board';
import styles from './CommentList.module.css';

interface Props {
  boardId: number;
  authorId: number;
}

export default function CommentList({ boardId, authorId }: Props) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const fetchComments = () => {
    getComments(boardId)
      .then((res) => setComments(res.data))
      .catch(() => alert('댓글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchComments();
  }, [boardId]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createComment(boardId, { content: newContent });
      setNewContent('');
      fetchComments();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError((err.response.data as ErrorResponse).message);
      } else {
        setError('댓글 작성에 실패했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch {
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleEditStart = (comment: CommentResponse) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleEditSubmit = async (commentId: number) => {
    if (!editContent.trim()) return;
    try {
      await updateComment(commentId, { content: editContent });
      setEditingId(null);
      setEditContent('');
      fetchComments();
    } catch {
      alert('댓글 수정에 실패했습니다.');
    }
  };

  if (loading) return <p className={styles.message}>댓글 로딩 중...</p>;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>댓글 {comments.length}개</h2>

      {comments.length === 0 ? (
        <p className={styles.message}>댓글이 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.nicknameWrap}>
                  <span className={styles.nickname}>{comment.nickname}</span>
                  {comment.usersId === authorId && (
                    <span className={styles.authorBadge}>작성자</span>
                  )}
                </div>
                <div className={styles.itemActions}>
                  <span className={styles.date}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                  {comment.usersId === CURRENT_USER_ID && editingId !== comment.id && (
                    <>
                      <button className={styles.actionButton} onClick={() => handleEditStart(comment)}>
                        수정
                      </button>
                      <button className={styles.actionButton} onClick={() => handleDelete(comment.id)}>
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.likeCount}>좋아요 {comment.likeCount}</div>
              {editingId === comment.id ? (
                <div className={styles.editForm}>
                  <textarea
                    className={styles.editTextarea}
                    rows={3}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className={styles.editActions}>
                    <button className={styles.editSubmit} onClick={() => handleEditSubmit(comment.id)}>
                      저장
                    </button>
                    <button className={styles.editCancel} onClick={handleEditCancel}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <p className={styles.content}>{comment.content}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <form className={styles.form} onSubmit={handleCreate}>
        {error && <p className={styles.error}>{error}</p>}
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="댓글을 입력하세요"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {submitting ? '등록 중...' : '댓글 등록'}
        </button>
      </form>
    </section>
  );
}
