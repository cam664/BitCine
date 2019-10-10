import Home from './Home';
import Character from './Character';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/character/:characterID',
    component: Character,
    exact: false
  }
];