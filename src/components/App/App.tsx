import { ChangeEvent, Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ResultTable from '../ResultTable/ResultTable.tsx';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';
import Button from '../Button/Button.tsx';
import ErrorDescription from '../ErrorDescription/ErrorDescription.tsx';
import styles from './App.module.css';
import { getApiPeoples, saveSearchQuery } from '../../utility/api.ts';

export type People = {
  name: string;
  birth_year: string;
  height: string;
  url: string;
};

type AppState = {
  searchQuery: string;
  peoples: People[];
  isLoading: boolean;
  isThrowError: boolean;
  apiError: string | null;
};
class App extends Component<object, AppState> {
  constructor(props: object) {
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
      <div className={styles.app}>
        <SearchBar
          disabled={this.state.isLoading}
          onInput={this.handleInput}
          searchQuery={this.state.searchQuery}
          onSearch={this.handleSearch}
        />
        {this.state.apiError !== null ? (
          <ErrorDescription description={this.state.apiError} />
        ) : (
          <div className={styles.results}>
            <div>Results</div>
            <ErrorBoundary>
              <ResultTable
                disabled={this.state.isLoading}
                peoples={this.state.peoples}
                headers={['Character name', 'Character characteristics']}
                isThrowError={this.state.isThrowError}
              />
              <Button view={'danger'} onClick={this.throwError}>
                Error Button
              </Button>
            </ErrorBoundary>
          </div>
        )}
      </div>
    );
  };
}

export default App;
