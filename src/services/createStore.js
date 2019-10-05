import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { StarwarsListReducer } from '../features/StarwarsList';

const reducer = combineReducers({
  StarwarsList: StarwarsListReducer,
});

export default (initialState) => 
  createStore(
    reducer, 
    initialState, 
    applyMiddleware(thunkMiddleware)
  );
