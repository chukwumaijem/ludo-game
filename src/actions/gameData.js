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
  return createAction(Types.REMOVE_NOTIFICATION)(data);
}

export function clearNotification(data) {
  return removeNotification(data);
}

function createNotification(data) {
  return createAction(Types.CREATE_NOTIFICATION)(data);
}

export function sendNotification(data) {
  return createNotification(data);
}

function changeTurnAction() {
  return createAction(Types.CHANGE_TURN)();
};

export function changeTurn() {
  return changeTurnAction();
}

function numberOfPlayers(data) {
  return createAction(Types.NUMBER_OF_PLAYERS)(data);
}
function numberOfPlayersUpdated() {
  return createAction(Types.NUMBER_OF_PLAYERS_UPDATED)();
}
export function setNumberOfPlayers(data) {
  return async (dispatch) => {
    await dispatch(numberOfPlayers(data));
    return dispatch(numberOfPlayersUpdated());
  }
}


function setDisabledHouse(data) {
  return createAction(Types.SET_DISABLED_HOUSES)(data);
}
function setDisabledHousesComplete() {
  return createAction(Types.SET_DISABLED_HOUSES_COMPLETE)();
}
export function setDisabled(data) {
  return async dispatch => {
    await dispatch(setDisabledHouse(data));
    return dispatch(setDisabledHousesComplete());
  }
}

export function removePlayerFromList(player) {
  return createAction(Types.MOVE_SEED_TO_POSITION)(player);
}

function resultToGlobalState(data) {
  return createAction(Types.SET_RESULT_TO_GLOBAL)(data);
}

export function setResultToGlobalState(data) {
  return resultToGlobalState(data)
}

function resetGameData(data) {
  return createAction(Types.RESET_GAME_DATA)(data);
}

export function gameDataReset(data) {
  return resetGameData(data)
}
