import { Component } from 'react';
import Spin from '../Spin/Spin.tsx';
import styles from './Loader.module.css';

type SpinProps = object;
type SpinState = object;
class Loader extends Component<SpinProps, SpinState> {
  render = () => {
    return (
      <div className={styles.loader}>
        <Spin />
      </div>
    );
  };
}

export default Loader;
