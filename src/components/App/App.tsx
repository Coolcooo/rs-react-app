import { ChangeEvent, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ResultTable from '../ResultTable/ResultTable.tsx';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';
import Button from '../Button/Button.tsx';
import ErrorDescription from '../ErrorDescription/ErrorDescription.tsx';
import styles from './App.module.css';
import { getApiPeoples } from '../../utility/api.ts';

export type People = {
  name: string;
  birth_year: string;
  height: string;
  url: string;
};

function useLocalStorage(key, defaultValue) {
  const [localStorageItem, setLocalStorageItem] = useState(
    localStorage.getItem(key) || defaultValue
  );
  return [
    localStorageItem,
    (value) => {
      setLocalStorageItem(value);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    },
  ];
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [peoples, setPeoples] = useState<People[]>([]);
  const [storageSearchQuery, setStorageSearchQuery] = useLocalStorage(
    'searchQuery',
    ''
  );
  const [searchQuery, setSearchQuery] = useState(storageSearchQuery);

  const [isThrowError, setIsThrowError] = useState(false);
  const [apiError, setApiError] = useState<null | string>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = async () => {
    setStorageSearchQuery(searchQuery);
    setIsLoading(true);
    const apiResponse = await getApiPeoples(searchQuery);
    setIsLoading(false);
    if (Array.isArray(apiResponse)) {
      setPeoples(apiResponse);
      setApiError(null);
    } else {
      setPeoples([]);
      setApiError(apiResponse);
    }
  };
  const throwError = () => {
    setIsThrowError(true);
  };

  useEffect(() => {
    handleSearch().then(() => {});
  }, []);

  return (
    <div className={styles.app}>
      <SearchBar
        disabled={isLoading}
        onInput={handleInput}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <div className={styles.results}>
        <div>Results</div>
        {apiError !== null ? (
          <ErrorDescription description={apiError} />
        ) : (
          <ErrorBoundary>
            <ResultTable
              disabled={isLoading}
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
    </div>
  );
}

export default App;
