import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  msgFeedback = () => {
    const { acertadas } = this.props;
    const num3 = 3;
    if (acertadas >= num3) {
      return (
        <h2 data-testid="feedback-text">Well Done!</h2>
      );
    } if (acertadas < num3) {
      return (
        <h2 data-testid="feedback-text">Could be better...</h2>
      );
    }
  };

  render() {
    const { acertadas } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h1>Feedback</h1>
        <h5>{ acertadas }</h5>
        { this.msgFeedback() }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  acertadas: state.player.acertadas,
});

Feedback.propTypes = {
  acertadas: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
