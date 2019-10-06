import { fetchPeopleAPI } from './';

const fetchPeopleActions = {
  REQUEST: 'StarwarsList/fetchPeople/REQUEST',
  SUCCESS: 'StarwarsList/fetchPeople/SUCCESS',
  FAILURE: 'StarwarsList/fetchPeople/FAILURE'
}

const initialState = {
  status: 'loading',
  data: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchPeopleActions.REQUEST:
      return {
        status: 'loading',
        data: []
      }
    case fetchPeopleActions.SUCCESS:
      return {
        status: 'success',
        data: action.payload.results,
        next: action.payload.next
      }
    case fetchPeopleActions.FAILURE:
      return {
        status: 'failure',
        data: []
      }
    default:
      return state;
  }
}

export function fetchPeople() {
  return async (dispatch) => {
    dispatch({ type: fetchPeopleActions.REQUEST });

    try {
      const res = await fetchPeopleAPI();
      const resJson = await res.json();

      dispatch({ 
        type: fetchPeopleActions.SUCCESS,
        payload: resJson
      });
    } catch(e) {
      dispatch({ type: fetchPeopleActions.FAILURE });
    }
  }
}