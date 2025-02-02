import { Component } from 'react';
import Spin from '../Spin/Spin.tsx';
import styles from './Loader.module.css';

class Loader extends Component<object, object> {
  render = () => {
    return (
      <div className={styles.loader}>
        <Spin />
      </div>
    );
  };
}

export default Loader;
