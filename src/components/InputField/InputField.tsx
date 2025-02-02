import { Component } from 'react';
import { SearchBarProps } from '../SearchBar/SearchBar.tsx';
import styles from './InputField.module.css';

class InputField extends Component<SearchBarProps, object> {
  render = () => {
    return (
      <input
        className={styles['input-field']}
        placeholder="Enter people's name"
        type="text"
        disabled={this.props.disabled}
        value={this.props.searchQuery}
        onChange={this.props.onInput}
      />
    );
  };
}
export default InputField;
