import { Component } from 'react';

type ButtonProps = {
  disabled?: boolean;
  children: string;
  view?: string;
  onClick?: () => void;
};
type ButtonState = object;
class Button extends Component<ButtonProps, ButtonState> {
  render = () => {
    return (
      <button onClick={this.props.onClick} disabled={this.props.disabled}>
        {this.props.children}
      </button>
    );
  };
}

export default Button;
