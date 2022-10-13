import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const gravatar = md5(email).toString();
    return (
      <header className="header">
        <img
          src={ logo }
          width="100"
          height="50"
          alt="logo"
        />
        <h3 data-testid="header-score"> Pontos: 00 </h3>
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <img
          className="img-avatar"
          width="50"
          height="50"
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="foto"
          data-testid="header-profile-picture"
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
