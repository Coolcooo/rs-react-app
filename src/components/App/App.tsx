import { ChangeEvent, Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ResultTable from '../ResultTable/ResultTable.tsx';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';
import Button from '../Button/Button.tsx';
import ErrorDescription from '../ErrorDescription/ErrorDescription.tsx';

export type People = {
  name: string;
  birth_year: string;
  height: string;
  url: string;
};
type ApiResponseResult = Promise<People[] | string>;
const isPeopleObject = (e: unknown): e is People => {
  return !!(
    e &&
    typeof e === 'object' &&
    'name' in e &&
    'birth_year' in e &&
    'height' in e &&
    'url' in e &&
    typeof e.name === 'string' &&
    typeof e.birth_year === 'string' &&
    typeof e.url === 'string' &&
    typeof e.height === 'string'
  );
};
const getPeoplesFromJson = (results: unknown[]): People[] => {
  const peoples: People[] = [];
  for (let i = 0; i < results.length; i += 1) {
    const resultItem = results[i];
    if (isPeopleObject(resultItem)) {
      peoples.push({
        birth_year: resultItem.birth_year,
        height: resultItem.height,
        name: resultItem.name,
        url: resultItem.url,
      });
    }
  }
  return peoples;
};
const getApiPeoples = async (searchQuery: string): ApiResponseResult => {
  const processSearchQuery = getProcessSearchQuery(searchQuery);
  let apiLink;
  if (processSearchQuery.length === 0) {
    apiLink = `https://swapi.dev/api/people/`;
  } else {
    apiLink = `https://swapi.dev/api/people/?search=${searchQuery}&&page=1`;
  }
  try {
    const response = await fetch(apiLink);
    if (response.ok) {
      const json: object = await response.json();
      if ('results' in json && Array.isArray(json.results)) {
        return getPeoplesFromJson(json.results);
      }
      return [];
    } else {
      return `Status code of response: ${response.status}`;
    }
  } catch {
    return 'Something went wrong';
  }
};

const getProcessSearchQuery = (searchQuery: string): string => {
  return encodeURIComponent(searchQuery.trim().toLowerCase());
};
const saveSearchQuery = (searchQuery: string): void => {
  localStorage.setItem('searchQuery', searchQuery);
};

type AppProps = object;
type AppState = {
  searchQuery: string;
  peoples: People[];
  isLoading: boolean;
  isThrowError: boolean;
  apiError: string | null;
};
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      peoples: [],
      searchQuery: localStorage.getItem('searchQuery') || '',
      isLoading: false,
      isThrowError: false,
      apiError: null,
    };
  }
  componentDidMount = () => {
    this.handleSearch().then(() => {});
  };

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };
  handleSearch = async () => {
    saveSearchQuery(this.state.searchQuery);
    this.setState({ isLoading: true });
    const apiResponse = await getApiPeoples(this.state.searchQuery);
    this.setState({ isLoading: false });
    if (Array.isArray(apiResponse)) {
      this.setState({ peoples: apiResponse, apiError: null });
    } else {
      this.setState({ peoples: [], apiError: apiResponse });
    }
  };
  throwError = () => {
    this.setState({ isThrowError: true });
  };
  render = () => {
    return (
      <>
        <SearchBar
          disabled={this.state.isLoading}
          onInput={this.handleInput}
          searchQuery={this.state.searchQuery}
          onSearch={this.handleSearch}
        />
        {this.state.apiError !== null ? (
          <ErrorDescription description={this.state.apiError} />
        ) : (
          <ErrorBoundary>
            <ResultTable
              disabled={this.state.isLoading}
              peoples={this.state.peoples}
              headers={['Character name', 'Character characteristics']}
              isThrowError={this.state.isThrowError}
            />
            <Button onClick={this.throwError}>Error Button</Button>
          </ErrorBoundary>
        )}
      </>
    );
  };
}

export default App;
