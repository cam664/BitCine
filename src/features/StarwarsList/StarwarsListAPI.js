import fetch from 'isomorphic-fetch';

export const fetchPeopleAPI = () => {
  return fetch(`https://swapi.co/api/people/`);
}

export const fetchPeopleNextAPI = (url) => {
  return fetch(`${url}`);
}

export const fetchShipsAPI = () => {
  return fetch(`https://swapi.co/api/starships/`);
}

export const fetchShipsNextAPI = (url) => {
  return fetch(`${url}`);
}

