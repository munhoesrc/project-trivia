import { GET_LOGIN, SET_SCORE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case SET_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
