import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const gravatar = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="foto"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <h3 data-testid="header-score"> 0 </h3>
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
