import { Component } from 'react';
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
class ResultTable extends Component<ResultTableProps, object> {
  render = () => {
    if (this.props.isThrowError) {
      throw new Error('Something went wrong');
    }
    return (
      <div className={styles['result-table-wrapper']}>
        <table>
          <ResultTableHeader headers={this.props.headers} />
          <ResultTableBody
            disabled={this.props.disabled}
            peoples={this.props.peoples}
          />
        </table>
      </div>
    );
  };
}

export default ResultTable;
