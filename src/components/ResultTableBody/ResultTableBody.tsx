import { Component, ReactNode } from 'react';
import ResultRow from '../ResultRow/ResultRow.tsx';
import { People } from '../App/App.tsx';

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
