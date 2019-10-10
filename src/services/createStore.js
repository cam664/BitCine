import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { StarwarsListReducer } from '../features/StarwarsList';
import { StarwarsCharacterReducer } from '../features/StarwarsCharacter';

const reducer = combineReducers({
  StarwarsList: StarwarsListReducer,
  StarwarsCharacter: StarwarsCharacterReducer
});

export default (initialState) => 
  createStore(
    reducer, 
    initialState, 
    applyMiddleware(thunkMiddleware)
  );
