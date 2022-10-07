import { GET_API, GET_LOGIN } from './actionsTypes';

export const getApi = (token) => ({
  type: GET_API,
  token,
});

export const getLogin = (name, email) => ({
  type: GET_LOGIN,
  name,
  email,
});
