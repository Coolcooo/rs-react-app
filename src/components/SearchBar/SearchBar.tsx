import { ChangeEvent, Component } from 'react';
import InputField from '../InputField/InputField.tsx';
import Button from '../Button/Button.tsx';
import styles from './SearchBar.module.css';

export type SearchBarProps = {
  disabled: boolean;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  onSearch: () => void;
};
type SearchBarState = object;
class SearchBar extends Component<SearchBarProps, SearchBarState> {
  render = () => {
    return (
      <div className={styles['search-bar']}>
        <InputField {...this.props} />
        <Button onClick={this.props.onSearch} disabled={this.props.disabled}>
          Search
        </Button>
      </>
    );
  };
}

export default SearchBar;
