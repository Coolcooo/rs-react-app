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

function Button({ view, onClick, disabled, children }: ButtonProps) {
  return (
    <button
      className={[styles.button, getStyleFromView(view)].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
