import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Inicio
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
