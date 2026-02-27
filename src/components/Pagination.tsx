import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.button}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className={styles.button}
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </button>
    </nav>
  );
}
