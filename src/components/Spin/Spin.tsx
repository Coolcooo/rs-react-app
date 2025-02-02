import { Component } from 'react';
import styles from './Spin.module.css';
type SpinProps = object;
type SpinState = object;
class Spin extends Component<SpinProps, SpinState> {
  render = () => {
    return <div className={styles['spin']}></div>;
  };
}

export default Spin;
