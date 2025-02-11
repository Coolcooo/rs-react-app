import Spin from '../Spin/Spin.tsx';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <Spin />
    </div>
  );
}

export default Loader;
