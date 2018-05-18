import { combineReducers } from 'redux';
import gameData from './gameData';
import gameSettings from './boardSettings';

const rootReducer = combineReducers({
  gameData,
  gameSettings,
});

export default rootReducer;