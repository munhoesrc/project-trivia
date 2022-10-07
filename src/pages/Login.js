import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import getToken from '../utils/getToken';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  input = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  clickButton = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    await getToken();
    history.push('/Jogo');
  };

  buttonConfig = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/config');
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
              data-testid="btn-settings"
              onClick={ this.buttonConfig }
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
