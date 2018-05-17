import { createAction } from 'redux-actions';
import Types from './actionTypes';
import { setSeedPosition } from '../utils/moveSeed';

function setColours(data) {
  return createAction(Types.SET_COLOURS)(data);
}

export function setHouseColours(colours) {
  return setColours(colours);
}

export function moveSeed(data) {
  return createAction(Types.MOVE_SEED_TO_POSITION)(data);
}

export function moveSeedToPosition(seed, position, cb) {
  return dispatch => {
    setSeedPosition({ dispatch, seed, position, cb });
  }
}

function disableInactiveSeed(data) {
  return createAction(Types.DISABLE_INACTIVE_HOUSE_SEEDS)(data);
}

export function disableInactiveHouseSeed(activeHouse) {
  return disableInactiveSeed(activeHouse);
}

function setDieCastComplete() {
  return createAction(Types.DIE_CAST_COMPLETE)();
}
export function dieCastComplete() {

  return setDieCastComplete();
}

function selectedSeed(data) {
  return createAction(Types.SET_SELECTED_SEED)(data);
}

export function setSelectedSeed(id) {
  return selectedSeed(id)
}

function removeNotification(data) {
  return createAction(Types.CREATE_NOTIFICATION)(data);
}

export function clearNotification(data) {
  return removeNotification(data);
}

function createNotification(data) {
  return createAction(Types.REMOVE_NOTIFICATION)(data);
}

export function sendNotification(data) {
  return createNotification(data);
}