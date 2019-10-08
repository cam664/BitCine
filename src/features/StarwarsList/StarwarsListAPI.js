import fetch from 'isomorphic-fetch';

export const fetchPeopleAPI = () => {
  return fetch(`https://swapi.co/api/people/`);
}