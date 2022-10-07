import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  input = ({ target }) => {
    this.setState({ [target.name]: target.value });
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
