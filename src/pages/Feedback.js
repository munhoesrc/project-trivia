import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    console.log(this.props);
    history.push('/');
  };

  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  msgFeedback = () => {
    const { assertions } = this.props;
    const num3 = 3;
    if (assertions >= num3) {
      return (
        <h2 data-testid="feedback-text">Well Done!</h2>
      );
    } if (assertions < num3) {
      return (
        <h2 data-testid="feedback-text">Could be better...</h2>
      );
    }
  };

  render() {
    const { assertions, score } = this.props;
    const scoreN = Number(score);
    const acertadasN = Number(assertions);
    return (
      <div data-testid="feedback-text">
        <Header />
        <h1>Feedback</h1>
        <h1 data-testid="feedback-total-score">{ scoreN }</h1>
        <h5 data-testid="feedback-total-question">{ acertadasN }</h5>
        { this.msgFeedback() }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.ranking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
