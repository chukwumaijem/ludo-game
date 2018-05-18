import Types from '../actions/actionTypes';
import { setColours } from '../utils/moveSeed';
import { still, movesLeft } from '../utils/constants';

// movesLeft here is the minimum number of moves needed to finish after coming out of the house.
const initialState = {
  houseOneCards: {
    'H1-C1': { position: still, movesLeft: movesLeft },
    'H1-C2': { position: still, movesLeft: movesLeft },
    'H1-C3': { position: still, movesLeft: movesLeft },
    'H1-C4': { position: still, movesLeft: movesLeft },
    'H1-Colour': 'blue'
  },
  houseTwoCards: {
    'H2-C1': { position: still, movesLeft: 34 },
    'H2-C2': { position: still, movesLeft: movesLeft },
    'H2-C3': { position: still, movesLeft: movesLeft },
    'H2-C4': { position: still, movesLeft: movesLeft },
    'H2-Colour': 'red'
  },
  houseThreeCards: {
    'H3-C1': { position: still, movesLeft: movesLeft },
    'H3-C2': { position: still, movesLeft: movesLeft },
    'H3-C3': { position: still, movesLeft: movesLeft },
    'H3-C4': { position: still, movesLeft: movesLeft },
    'H3-Colour': 'yellow'
  },
  houseFourCards: {
    'H4-C1': { position: still, movesLeft: movesLeft },
    'H4-C2': { position: still, movesLeft: movesLeft },
    'H4-C3': { position: still, movesLeft: movesLeft },
    'H4-C4': { position: still, movesLeft: movesLeft },
    'H4-Colour': 'green'
  },
  playerTurn: 'P2', //`P${parseInt((Math.random() * 4), 10) + 1}`,
  loggedInPlayer: 'P2', //this is used to decide which house belongs to the current player
  selectedSeed: '',
  dieCast: false, // true is a user has finished rolling die for his turn
  notification: {}
};



export default function gameData(state = initialState, action) {
  switch (action.type) {
    case Types.SET_COLOURS:
      return setColours(state, action);
    case Types.MOVE_SEED_TO_POSITION:
      return Object.assign({}, state, action.seedGroup);
    case Types.DISABLE_INACTIVE_HOUSE_SEEDS:
      const items = { ...state };
      Object.keys(items).forEach(item => {
        if (item.endsWith('Cards')) {
          Object.keys(items[item]).forEach(data => {
            if (!data.toLowerCase().includes('colour')) {
              if (data.substr(1, 1) !== action.payload.substr(1, 1)) {
                items[item][data].disabled = true;
              } else {
                items[item][data].disabled = false;
              }
            }
          });
        }
      });
      return items;
    case Types.DIE_CAST_COMPLETE:
      return Object.assign({},
        state,
        { dieCast: true }
      );
    case Types.SET_SELECTED_SEED:
      const seedId = action.payload;
      if (seedId.substr(1, 1) !== state.playerTurn.substr(1, 1))
        return state;
      return Object.assign({},
        state,
        { selectedSeed: seedId }
      );
    case Types.CHANGE_TURN:
      const turn = Number(state.playerTurn.substr(1, 1));
      const nextTurn = turn === 2 ? 'P4' : turn === 3 ? 'P1' : turn === 4 ? 'P3' : `P${turn + 1}`
      return Object.assign({},
        state,
        {
          playerTurn: nextTurn, //order: 1, 2, 4, 3 and repeat
          selectedSeed: '',
          dieCast: false,
          loggedInPlayer: nextTurn, // for dev only. key needs to be removed for prod.
        }
      );
    case Types.REMOVE_NOTIFICATION:
      return Object.assign({},
        state,
        { notification: [] }
      )
    case Types.CREATE_NOTIFICATION:
      return Object.assign({},
        state,
        { notification: action.payload }, // use id here so notifications can be cleared one after the other.
      )
    default:
      return state;
  }
}
