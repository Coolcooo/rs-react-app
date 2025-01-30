import { Component } from 'react';
import { People } from '../App/App.tsx';

type ResultTableProps = {
  disabled?: boolean;
  peoples: People[];
};
class ResultTable extends Component<ResultTableProps, object> {}

export default ResultTable;
