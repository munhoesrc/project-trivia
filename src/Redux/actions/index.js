import GET_API from './actionsTypes';

const getApi = (token) => ({
  type: GET_API,
  token,
});

export default getApi;
