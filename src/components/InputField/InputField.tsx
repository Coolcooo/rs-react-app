import styles from './InputField.module.css';
import { ChangeEvent } from 'react';

type InputFieldProps = {
  disabled?: boolean;
  searchQuery: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
};
function InputField({ disabled, searchQuery, onInput }: InputFieldProps) {
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
