import { createAction } from 'redux-actions';
import Types from './actionTypes';
import { setSeedPosition } from '../utils/moveSeed';

function setColour(data) {
  return createAction(Types.SET_COLOURS)(data);
}

export function setHouseColours(colours) {
  return setColour(colours);
}

export function moveSeed(data) {
  return createAction(Types.MOVE_SEED_TO_POSITION)(data);
}

export function moveSeedToPosition(seed, position) {
  return dispatch => {
    setSeedPosition({ dispatch, seed, position });
    // moveSeed({ seed, position })
  }
}