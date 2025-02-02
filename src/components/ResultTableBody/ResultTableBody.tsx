import { Component, ReactNode } from 'react';
import ResultRow from '../ResultRow/ResultRow.tsx';
import { People } from '../App/App.tsx';
import styles from './ResultTableBody.module.css';
import Loader from '../Loader/Loader.tsx';

type ResultTableBodyProps = {
  peoples: People[];
};
class ResultTableBody extends Component<ResultTableBodyProps, object> {
  render = () => {
    const peopleItems = this.props.peoples.map((e): ReactNode => {
      return <ResultRow people={e} key={e.url}></ResultRow>;
    });

    return <tbody>{peopleItems}</tbody>;
  };
}

export default ResultTableBody;
