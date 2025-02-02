import { Component } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  disabled?: boolean;
  children: string;
  view?: string;
  onClick?: () => void;
};
const getStyleFromView = (view: string | undefined) => {
  switch (view) {
    case 'action':
      return styles.action;
    case 'danger':
      return styles.danger;
    case 'normal':
    default:
      return styles.normal;
  }
};

class Button extends Component<ButtonProps, object> {
  render = () => {
    return (
      <button
        className={[styles.button, getStyleFromView(this.props.view)].join(' ')}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  };
}

export default Button;
