type ResultTableHeaderProps = {
  headers: string[];
};
function ResultTableHeader({ headers }: ResultTableHeaderProps) {
  const headerItems = headers.map((e) => {
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
}

export default ResultTableHeader;
