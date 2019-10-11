import { 
  fetchPersonAPI
} from './StarwarsCharacterAPI';

export const fetchPersonActions = {
  REQUEST: 'StarwarsCharacter/fetchPerson/REQUEST',
  SUCCESS: 'StarwarsCharacter/fetchPerson/SUCCESS',
  FAILURE: 'StarwarsCharacter/fetchPerson/FAILURE'
}

const initialState = {
  status: 'loading',
  data: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // fetchPerson
    case fetchPersonActions.REQUEST:
      return {
        ...state,
        status: 'loading',
        data: {},
      }
    case fetchPersonActions.SUCCESS:
      return {
        ...state,
        status: 'success',
        data: action.data
      }
    case fetchPersonActions.FAILURE:
      return {
        ...state,
        status: 'failure',
        data: {},
      }

    default:
      return state;
  }
}

export function fetchPerson(id) {
  return async (dispatch) => {
    dispatch({ type: fetchPersonActions.REQUEST });

    try {
      const res = await fetchPersonAPI(id).then(res => res.json());

      dispatch({
        type: fetchPersonActions.SUCCESS,
        data: res
      });
    } catch(e) {
      dispatch({ type: fetchPersonActions.FAILURE });
    }
  }
}