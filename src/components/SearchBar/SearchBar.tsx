import { ChangeEvent } from 'react';
import InputField from '../InputField/InputField.tsx';
import Button from '../Button/Button.tsx';
import styles from './SearchBar.module.css';

export type SearchBarProps = {
  disabled: boolean;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  onSearch: () => void;
};
function SearchBar({
  disabled,
  searchQuery,
  onSearch,
  onInput,
}: SearchBarProps) {
  return (
    <div className={styles['search-bar']}>
      <InputField
        disabled={disabled}
        searchQuery={searchQuery}
        onInput={onInput}
      />
      <Button view={'action'} onClick={onSearch} disabled={disabled}>
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
