import { Component } from 'react';
import { SearchBarProps } from '../SearchBar/SearchBar.tsx';

type InputFieldState = object;
class InputField extends Component<SearchBarProps, InputFieldState> {
  render = () => {
    return (
      <input
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
