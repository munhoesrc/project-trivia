import { GET_API, GET_LOGIN, GET_PERGUNTAS } from './actionsTypes';

export const getApi = (token) => ({
  type: GET_API,
  token,
});

export const getLogin = (name, email) => ({
  type: GET_LOGIN,
  name,
  email,
});

const perguntas = (payload) => ({ type: GET_PERGUNTAS, payload });

export const fetchPerguntas = () => (dispatch) => {
  const token = localStorage.getItem('token');
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => dispatch(perguntas(data)));
};
