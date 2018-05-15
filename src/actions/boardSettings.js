import { createAction } from 'redux-actions';
import Types from './actionTypes';

function setBoardSettings(data) {
  return createAction(Types.UPDATE_BOARD_SETTINGS)(data);
}

export function updateBoardSettings(data) {
  return dispatch => {
    dispatch(setBoardSettings(data))
  };
}