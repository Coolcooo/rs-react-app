import { ReactNode } from 'react';
import ResultRow from '../ResultRow/ResultRow.tsx';
import { People } from '../App/App.tsx';
import styles from './ResultTableBody.module.css';
import Loader from '../Loader/Loader.tsx';

type ResultTableBodyProps = {
  peoples: People[];
  disabled?: boolean;
};
function ResultTableBody({ peoples, disabled }: ResultTableBodyProps) {
  const peopleItems = peoples.map((e): ReactNode => {
    return <ResultRow people={e} key={e.url}></ResultRow>;
  });

  return (
    <div className={styles['table-body']}>
      {disabled && <Loader />}
      <table>
        <tbody>{peopleItems}</tbody>
      </table>
    </div>
  );
}

export default ResultTableBody;
