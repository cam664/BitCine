import fetch from 'isomorphic-fetch';

export const fetchPeopleAPI = () => {
  return fetch(`https://swapi.co/api/people/`);
}

export const fetchShipsAPI = () => {
  return fetch(`https://swapi.co/api/starships/`);
}