import { People } from '../App/App.tsx';
import ResultTableHeader from '../ResultTableHeader/ResultTableHeader.tsx';
import ResultTableBody from '../ResultTableBody/ResultTableBody.tsx';
import styles from './ResultTable.module.css';

type ResultTableProps = {
  disabled?: boolean;
  peoples: People[];
  headers: string[];
  isThrowError: boolean;
};
function ResultTable({
  isThrowError,
  peoples,
  headers,
  disabled,
}: ResultTableProps) {
  if (isThrowError) {
    throw new Error('Something went wrong');
  }
  return (
    <div className={styles['result-table-wrapper']}>
      <table>
        <ResultTableHeader headers={headers} />
        <ResultTableBody disabled={disabled} peoples={peoples} />
      </table>
    </div>
  );
}

export default ResultTable;
