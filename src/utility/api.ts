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
export const getApiPeoples = async (
  searchQuery: string,
  page: number
): ApiResponseResult => {
  const processSearchQuery = getProcessSearchQuery(searchQuery);
  let apiLink;
  if (processSearchQuery.length === 0) {
    apiLink = `https://swapi.dev/api/people/?page=${page}`;
  } else {
    apiLink = `https://swapi.dev/api/people/?search=${searchQuery}&&page=${page}`;
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

export const getApiPeopleFilms = async (peopleInfo) => {
    const filmUrls = peopleInfo.films;
    const filmPromises = [];
    for (let i = 0; i < filmUrls.length; i += 1) {
        filmPromises.push(fetch(filmUrls[i]));
    }

    try {
        const filmInfoResponses = await Promise.all(filmPromises);
        const filmsInfo = await Promise.all(filmInfoResponses.map((e) => e.json()));
        return filmsInfo.map((e) => e.title);
    } catch {
        return null;
    }
};

export const getApiPeopleSpecies = async (peopleInfo) => {
    const speciesUrl = peopleInfo.species[0];
    if (!speciesUrl) {
        throw new Error('No species available');
    }
    const response = await fetch(speciesUrl);
    const speciesInfo = await response.json();
    return speciesInfo;
}
const getProcessSearchQuery = (searchQuery: string): string => {
  return encodeURIComponent(searchQuery.trim().toLowerCase());
};
