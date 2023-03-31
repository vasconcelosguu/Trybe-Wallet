import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const combReducers = combineReducers({ user, wallet });

export default combReducers;
