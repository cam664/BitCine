import { fetchPeopleAPI } from './StarwarsListAPI';
import { fetchShipsAPI } from './StarwarsListAPI';

const fetchListActions = {
  REQUEST: 'StarwarsList/fetchList/REQUEST',
  SUCCESS: 'StarwarsList/fetchList/SUCCESS',
  FAILURE: 'StarwarsList/fetchList/FAILURE'
}

const fetchShipsActions = {
  REQUEST: 'StarwarsList/fetchShips/REQUEST',
  SUCCESS: 'StarwarsList/fetchShips/SUCCESS',
  FAILURE: 'StarwarsList/fetchShips/FAILURE'
}

const initialState = {
  list: {
    status: 'loading',
    data: [],
    next: null,
    spliceIdx: 7
  },
  ships: {
    status: 'loading',
    data: [],
    next: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchListActions.REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'loading',
          data: [],
        }
      }
    case fetchListActions.SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'success',
          data: action.data,
          next: action.next,
          
        }
      }
    case fetchListActions.FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'failure',
          data: [],
        }
      }

      case fetchShipsActions.REQUEST:
        return {
          ...state,
          ships: {
            ...state.ships,
            status: 'loading',
            data: [],
            
          }
        }
      case fetchShipsActions.SUCCESS:
        return {
          ...state,
          ships: {
            ...state.ships,
            status: 'success',
            data: action.data,
            next: action.next,
            
          }
        }
      case fetchShipsActions.FAILURE:
        return {
          ...state,
          ships: {
            ...state.ships,
            status: 'failure',
            data: [],
            
          }
        }
    default:
      return state;
  }
}

export function fetchList() {
  return async (dispatch, getState) => {
    dispatch({ type: fetchListActions.REQUEST });
    dispatch({ type: fetchShipsActions.REQUEST });

    try {
      let res = await Promise.all([
        fetchPeopleAPI().then(res => res.json()), 
        fetchShipsAPI().then(res => res.json())
      ]);
      
      const currState = getState();
      const { spliceIdx } = currState.StarwarsList.list;

      let peopleRes = res[0];
      let shipsRes = res[1]
      let listPayload = [...peopleRes.results];
      let shipsPayload = [...shipsRes.results];

      listPayload.splice(spliceIdx, 0, shipsPayload.shift())
      const nextSpliceIdx = spliceIdx + 8; 
      
      dispatch({ 
        type: fetchListActions.SUCCESS,
        data: listPayload,
        next: peopleRes.next,
        spliceIdx: nextSpliceIdx
      });
      dispatch({
        type: fetchShipsActions.SUCCESS,
        data: shipsPayload,
        next: shipsRes.next
      });
    } catch(e) {
      dispatch({ type: fetchListActions.FAILURE });
      dispatch({ type: fetchShipsActions.FAILURE });
    }
  }
}