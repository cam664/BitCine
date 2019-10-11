import { 
  fetchPeopleAPI, 
  fetchShipsAPI, 
  fetchPeopleNextAPI, 
  fetchShipsNextAPI 
} from './StarwarsListAPI';

export const fetchListActions = {
  REQUEST: 'StarwarsList/fetchList/REQUEST',
  SUCCESS: 'StarwarsList/fetchList/SUCCESS',
  FAILURE: 'StarwarsList/fetchList/FAILURE'
}

const fetchShipsActions = {
  REQUEST: 'StarwarsList/fetchShips/REQUEST',
  SUCCESS: 'StarwarsList/fetchShips/SUCCESS',
  FAILURE: 'StarwarsList/fetchShips/FAILURE'
}

const fetchListNextActions = {
  REQUEST: 'StarwarsList/fetchListNext/REQUEST',
  SUCCESS: 'StarwarsList/fetchListNext/SUCCESS',
  FAILURE: 'StarwarsList/fetchListNext/FAILURE'
}

const fetchShipsNextActions = {
  REQUEST: 'StarwarsList/fetchShipsNext/REQUEST',
  SUCCESS: 'StarwarsList/fetchShipsNext/SUCCESS',
  FAILURE: 'StarwarsList/fetchShipsNext/FAILURE'
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
    // fetchList
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
          spliceIdx: action.spliceIdx
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
      // fetchShips
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
      // fetchListNext
      case fetchListNextActions.REQUEST:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'loading', 
          }
        }
      case fetchListNextActions.SUCCESS:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'success',
            data: action.data,
            next: action.next,
          }
        }
      case fetchListNextActions.FAILURE:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'failure', 
          }
        }
      // fetchShipsNext
      case fetchShipsNextActions.REQUEST:
        return {
          ...state,
          ships: {
            ...state.ships,
            status: 'loading', 
          }
        }
      case fetchShipsNextActions.SUCCESS:
        return {
          ...state,
          ships: {
            ...state.ships,
            status: 'success',
            data: action.data,
            next: action.next,
          }
        }
      case fetchShipsNextActions.FAILURE:
        return {
          ...state,
          ships: {
            ...state.ships,
            status: 'failure', 
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
      const res = await Promise.all([
        fetchPeopleAPI().then(res => res.json()), 
        fetchShipsAPI().then(res => res.json())
      ]);
      
      const currState = getState();
      let { spliceIdx } = currState.StarwarsList.list;

      let peopleRes = res[0];
      let shipsRes = res[1]
      let listPayload = [...peopleRes.results];
      let shipsPayload = [...shipsRes.results];

      listPayload.splice(spliceIdx, 0, shipsPayload.shift())
      let nextSpliceIdx = spliceIdx + 8; 
      
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

export function fetchListNext() {
  return async (dispatch, getState) => {
    const currState = getState();
    const listNextUrl = currState.StarwarsList.list.next;
    const ships = currState.StarwarsList.ships.data;

    let dataReqs = [fetchPeopleNextAPI(listNextUrl)];
    if (ships.length < 2) {
      dataReqs.push(fetchShipsNextAPI(currState.StarwarsList.ships.next))
    }

    if (dataReqs.length === 1) {
      dispatch({ type: fetchListNextActions.REQUEST });
    } else {
      dispatch({ type: fetchListNextActions.REQUEST });
      dispatch({ type: fetchShipsNextActions.REQUEST });
    }

    try {
      const res = await Promise.all(dataReqs)
        .then(res => Promise.all(res.map(res => res.json())));

      const { spliceIdx } = currState.StarwarsList.list;
      let currList = currState.StarwarsList.list.data;

      let peopleRes = res[0];
      let shipsPayload = res[1] ? [...ships, ...res[1].results] : ships;
      let shipsNext = res[1] ? res[1].next : currState.StarwarsList.ships.next;
      let listPayload = [...currList, ...peopleRes.results];

      listPayload.splice(spliceIdx, 0, shipsPayload.shift())
      let nextSpliceIdx = spliceIdx + 8; 

      while (nextSpliceIdx < listPayload.length) {
        listPayload.splice(nextSpliceIdx, 0, shipsPayload.shift())
        nextSpliceIdx += 8;
      }
      
      dispatch({ 
        type: fetchListActions.SUCCESS,
        data: listPayload,
        next: peopleRes.next,
        spliceIdx: nextSpliceIdx
      });
      dispatch({
        type: fetchShipsActions.SUCCESS,
        data: shipsPayload,
        next: shipsNext
      });
    } catch(e) {
      dispatch({ type: fetchListNextActions.FAILURE });
      dispatch({ type: fetchShipsNextActions.FAILURE });
    }
  }
}