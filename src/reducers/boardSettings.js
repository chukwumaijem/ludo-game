import Types from '../actions/actionTypes';

const initialState = {
  gameBoardHeight: 700,
  sideBoardWidth: 100,
};

function updateSettings(state, data) {
  return Object.assign(
    {}, state,
    data
  );
}

export default function gameData(state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_BOARD_SETTINGS:
      return updateSettings(state, action.payload);
    default:
      return state;
  }
}
