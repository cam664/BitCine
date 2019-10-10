import fetch from 'isomorphic-fetch';

export const fetchPersonAPI = (id) => {
  return fetch(`https://swapi.co/api/people/${id}`);
}