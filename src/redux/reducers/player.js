import { GET_LOGIN } from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};

export default player;
