import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
// import getToken from '../Redux/actions/getToken';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  input = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  getToken = async () => {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.token);
    localStorage.setItem('token', data.token);
    // return data.token;
  };

  clickButton = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    await this.getToken();
    history.push('/Jogo');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
        </div>
        <div>
          <label htmlFor="nomeLabel">
            Nome
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.input }
              id="nomeLabel"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="emailLabel">
            Email
            <input
              type="email"
              value={ email }
              name="email"
              id="emailLabel"
              onChange={ this.input }
              data-testid="input-gravatar-email"
            />
          </label>
          <div>
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ !(email.length > 0 && name.length > 0) }
              onClick={ this.clickButton }
            >
              Play
            </button>
          </div>
          <div>
            <button
              type="button"
            >
              Configuração
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
