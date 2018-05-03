import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const defaultState = {
};

const enhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, defaultState, enhancer);

export default store;