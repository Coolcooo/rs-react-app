import { People } from '../components/App/App.tsx';

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
export const getApiPeoples = async (searchQuery: string): ApiResponseResult => {
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
export const saveSearchQuery = (searchQuery: string): void => {
  localStorage.setItem('searchQuery', searchQuery);
};
