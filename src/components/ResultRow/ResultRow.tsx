import { Component } from 'react';
import { People } from '../App/App.tsx';

type ResultRowProps = {
  people: People;
};
class ResultRow extends Component<ResultRowProps, object> {
  render = () => {
    return (
      <tr>
        <th scope="row">{this.props.people.name}</th>
        <td>
          <ul>
            <li>Birth year: {this.props.people.birth_year}</li>
            <li>Height: {this.props.people.height}</li>
          </ul>
        </td>
      </tr>
    );
  };
}

export default ResultRow;
