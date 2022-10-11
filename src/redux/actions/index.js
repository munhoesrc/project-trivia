import { GET_API, GET_LOGIN, GET_PERGUNTAS, SET_SCORE } from './actionsTypes';

export const getApi = (token) => ({
  type: GET_API,
  token,
});

export const getLogin = (name, email) => ({
  type: GET_LOGIN,
  name,
  email,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

const perguntas = (payload) => ({ type: GET_PERGUNTAS, payload });

export const fetchPerguntas = () => (dispatch) => {
  const token = localStorage.getItem('token');
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => dispatch(perguntas(data)));
};
