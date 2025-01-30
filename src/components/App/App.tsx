import { ChangeEvent, Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ResultTable from '../ResultTable/ResultTable.tsx';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';
import Button from '../Button/Button.tsx';

export type People = {
  name: string;
  age: number;
  height: number;
};
type ApiResponseResult = Promise<People[] | number | null>;
const isPeopleObject = (e: unknown): e is People => {
  return !!(
    e &&
    typeof e === 'object' &&
    'name' in e &&
    'age' in e &&
    'height' in e &&
    typeof e.name === 'string' &&
    typeof e.age === 'number' &&
    typeof e.height === 'number'
  );
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
      const peoples: People[] = [];
      if ('results' in json && Array.isArray(json.results)) {
        const results = json.results;
        for (let i = 0; i < results.length; i += 1) {
          const resultItem = results[i];
          if (isPeopleObject(resultItem)) {
            peoples.push({
              age: resultItem.age,
              height: resultItem.height,
              name: resultItem.name,
            });
          }
        }
      }
      return peoples;
    } else {
      return response.status;
    }
  } catch {
    return null;
  }
};

const getProcessSearchQuery = (searchQuery: string): string => {
  return encodeURIComponent(searchQuery.trim().toLowerCase());
};
const saveSearchQuery = (searchQuery: string): void => {
  localStorage.setItem('searchQuery', searchQuery);
};
const throwError = () => {
  throw new Error('something went wrong');
};

type AppProps = object;
type AppState = {
  searchQuery: string;
  peoples: People[];
  isLoading: boolean;
};
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      peoples: [],
      searchQuery: localStorage.getItem('searchQuery') || '',
      isLoading: false,
    };
  }
  componentDidMount = () => {
    this.handleSearch();
  };

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };
  handleSearch = async () => {
    saveSearchQuery(this.state.searchQuery);
    this.setState({ isLoading: true });
    const peoples = await getApiPeoples(this.state.searchQuery);
    this.setState({ isLoading: false });
    if (Array.isArray(peoples)) {
      this.setState({ peoples });
    }
  };
  render = () => {
    return (
      <>
        <SearchBar
          disabled={this.state.isLoading}
          onInput={this.handleInput}
          searchQuery={this.state.searchQuery}
        />
        <ErrorBoundary>
          <ResultTable
            disabled={this.state.isLoading}
            peoples={this.state.peoples}
          />
          <Button onClick={throwError}>Error Button</Button>
        </ErrorBoundary>
      </>
    );
  };
}

export default App;
