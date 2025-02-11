import { SearchBarProps } from '../SearchBar/SearchBar.tsx';
import styles from './InputField.module.css';

function InputField({ disabled, searchQuery, onInput }: SearchBarProps) {
  return (
    <input
      className={styles['input-field']}
      placeholder="Enter people's name"
      type="text"
      disabled={disabled}
      value={searchQuery}
      onChange={onInput}
    />
  );
}
export default InputField;
