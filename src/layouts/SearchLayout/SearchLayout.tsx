import styles from '../../components/App/App.module.css';
import SearchBar, {
  SearchBarProps,
} from '../../components/SearchBar/SearchBar.tsx';
import { Outlet } from 'react-router';

function SearchLayout({
  disabled,
  onInput,
  searchQuery,
  onSearch,
}: SearchBarProps) {
  return (
    <div className={styles.app}>
      <SearchBar
        disabled={disabled}
        onInput={onInput}
        searchQuery={searchQuery}
        onSearch={onSearch}
      />
      <Outlet />
    </div>
  );
}

export default SearchLayout;
