import { People } from '../App/App.tsx';

type ResultRowProps = {
  people: People;
};

function ResultRow({ people }: ResultRowProps) {
  return (
    <tr>
      <th scope="row">{people.name}</th>
      <td>
        <ul>
          <li>Birth year: {people.birth_year}</li>
          <li>Height: {people.height}</li>
        </ul>
      </td>
    </tr>
  );
}

export default ResultRow;
