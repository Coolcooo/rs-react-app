import { Component } from 'react';

type ResultTableHeaderProps = {
  headers: string[];
};
class ResultTableHeader extends Component<ResultTableHeaderProps, object> {
  render = () => {
    const headerItems = this.props.headers.map((e) => {
      return (
        <th scope="col" key={e}>
          {e}
        </th>
      );
    });
    return (
      <table>
        <thead>
          <tr>{headerItems}</tr>
        </thead>
      </table>
    );
  };
}

export default ResultTableHeader;
