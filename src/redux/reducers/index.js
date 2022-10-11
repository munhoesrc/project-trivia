import { combineReducers } from 'redux';
import player from './player';
import perg from './perguntasReducer';

const rootReducer = combineReducers({ player, perg });

export default rootReducer;
