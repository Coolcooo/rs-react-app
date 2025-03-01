import styles from '../../components/App/App.module.css';
import ErrorDescription from '../../components/ErrorDescription/ErrorDescription.tsx';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary.tsx';
import ResultTable from '../../components/ResultTable/ResultTable.tsx';
import Button from '../../components/Button/Button.tsx';
import { People } from '../../components/App/App.tsx';

type HomeProps = {
  apiError: null | string;
  disabled?: boolean;
  peoples: People[];
  isThrowError: boolean;
  throwError: () => void;
};
function Home({
  apiError,
  disabled,
  peoples,
  isThrowError,
  throwError,
}: HomeProps) {
  return (
    <div className={styles.results}>
      <div>Results</div>
      {apiError !== null ? (
        <ErrorDescription description={apiError} />
      ) : (
        <ErrorBoundary>
          <ResultTable
            disabled={disabled}
            peoples={peoples}
            headers={['Character name', 'Character characteristics']}
            isThrowError={isThrowError}
          />
          <Button view={'danger'} onClick={throwError}>
            Error Button
          </Button>
        </ErrorBoundary>
      )}
    </div>
  );
}

export default Home;
