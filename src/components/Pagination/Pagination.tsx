import Button from '../Button/Button.tsx';

type PaginationProps = {
  disabledNext: boolean;
  disabledPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
};
function Pagination({
  disabledNext,
  disabledPrevious,
  onNext,
  onPrevious,
}: PaginationProps) {
  return (
    <div className="pagination">
      <Button disabled={disabledPrevious} onClick={onPrevious}>
        {'<'}
      </Button>
      <Button disabled={disabledNext} onClick={onNext}>
        {'>'}
      </Button>
    </div>
  );
}

export default Pagination;
