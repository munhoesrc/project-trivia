import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiSettings } from 'react-icons/fi';
import logo from '../trivia.png';
import getToken from '../utils/getToken';
import { getLogin } from '../redux/actions/index';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  input = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  emailStado = () => {
    const { dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(getLogin(name, email));
  };

  clickButton = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    await getToken();
    this.emailStado();
    history.push('/game');
  };

  buttonConfig = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { name, email } = this.state;
    return (
      <form className="main-login">
        <main className="right-login">
          <div className="card-login">
            <img src={ logo } className="App-logo" alt="logo" />
            <div className="textfield">
              <span>Nome</span>
              <input
                placeholder="Digite seu nome"
                type="text"
                name="name"
                value={ name }
                onChange={ this.input }
                id="nomeLabel"
                data-testid="input-player-name"
              />
              <br />
              <span>Email</span>
              <input
                placeholder="Digite seu email"
                type="email"
                value={ email }
                name="email"
                id="emailLabel"
                onChange={ this.input }
                data-testid="input-gravatar-email"
              />
            </div>

            <button
              className="btn fourth"
              type="submit"
              data-testid="btn-play"
              disabled={ !(email.length > 0 && name.length > 0) }
              onClick={ this.clickButton }
            >
              Play

            </button>

            <button
              className="btn-settings"
              type="button"
              data-testid="btn-settings"
              onClick={ this.buttonConfig }
            >
              <FiSettings fontSize="20" />

            </button>

          </div>
        </main>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
