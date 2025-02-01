import { Component } from 'react';
import { People } from '../App/App.tsx';
import ResultTableHeader from '../ResultTableHeader/ResultTableHeader.tsx';
import ResultTableBody from '../ResultTableBody/ResultTableBody.tsx';
import Loader from '../Loader/Loader.tsx';

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
    if (this.props.disabled) {
      return <Loader />;
    }
    return (
      <table>
        <ResultTableHeader headers={this.props.headers} />
        <ResultTableBody peoples={this.props.peoples} />
      </table>
    );
  };
}

export default ResultTable;
