import { ChangeEvent, Component } from 'react';
import InputField from '../InputField/InputField.tsx';
import Button from '../Button/Button.tsx';

export type SearchBarProps = {
  disabled: boolean;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
};
type SearchBarState = object;
class SearchBar extends Component<SearchBarProps, SearchBarState> {
  render = () => {
    return (
      <>
        <InputField {...this.props} />
        <Button disabled={this.props.disabled}>Search</Button>
      </>
    );
  };
}

export default SearchBar;
