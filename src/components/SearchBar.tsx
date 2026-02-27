import { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  initialKeyword?: string;
}

export default function SearchBar({ onSearch, initialKeyword = '' }: SearchBarProps) {
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="제목으로 검색..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        검색
      </button>
    </form>
  );
}
