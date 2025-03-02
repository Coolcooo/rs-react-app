import { ChangeEvent, useEffect, useState } from 'react';
import { getApiPeoples } from '../../utility/api.ts';
import { Routes, Route, useSearchParams } from 'react-router';
import SearchLayout from '../../layouts/SearchLayout/SearchLayout.tsx';
import Home from '../../pages/Home/Home.tsx';
import NotFound from "../../pages/NotFound/NotFound";

export type People = {
  name: string;
  birth_year: string;
  height: string;
  url: string;
};

function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
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
  const [searchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const page = queryPage !== null ? parseInt(queryPage, 10) : 1;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = async () => {
    setStorageSearchQuery(searchQuery);
    setIsLoading(true);
    const apiResponse = await getApiPeoples(searchQuery, page);
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
    <Routes>
      <Route
        element={
          <SearchLayout
            disabled={isLoading}
            onSearch={handleSearch}
            onInput={handleInput}
            searchQuery={searchQuery}
          />
        }
      >
        <Route
          index
          element={
            <Home
              disabled={isLoading}
              peoples={peoples}
              isThrowError={isThrowError}
              throwError={throwError}
              apiError={apiError}
            />
          }
        />
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
