// import getApi from './index';

const url = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.token);
  localStorage.setItem('token', data.token);
  return data.token;
};

const resultToken = async () => {
  const token = getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  console.log(json);
  return json;
};

export {
  getToken,
  resultToken,
};
