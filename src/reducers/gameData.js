import Types from '../actions/actionTypes';
import { setColours } from '../utils/moveSeed';

const initialState = {
  houseOneCards: {
    'H1-C1': 'HL-01',
    'H1-C2': 'still',
    'H1-C3': 'still',
    'H1-C4': 'still',
    'H1-Colour': null
  },
  houseTwoCards: {
    'H2-C1': 'VT-12',
    'H2-C2': 'still',
    'H2-C3': 'still',
    'H2-C4': 'still',
    'H2-Colour': null
  },
  houseThreeCards: {
    'H3-C1': 'VB-40',
    'H3-C2': 'still',
    'H3-C3': 'still',
    'H3-C4': 'still',
    'H3-Colour': null
  },
  houseFourCards: {
    'H4-C1': 'HR-24',
    'H4-C2': 'still',
    'H4-C3': 'still',
    'H4-C4': 'still',
    'H4-Colour': null
  },
  playerTurn: 'P1',
};



export default function gameData(state = initialState, action) {
  switch (action.type) {
    case Types.SET_COLOURS:
      return setColours(state, action);
    case Types.MOVE_SEED_TO_POSITION:
      return Object.assign({}, state, action.seedGroup);
    default:
      return state;
  }
}
