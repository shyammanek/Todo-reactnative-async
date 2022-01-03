import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './Reducers';

const rootReducer = combineReducers({ taskReducer });
const Store = createStore(rootReducer, applyMiddleware(thunk));
export default Store