import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScore } from '../redux/actions/index';

class Questions extends Component {
  state = {
    idPergunta: 0,
    respostas: [],
    btnDasRespostas: false,
    disabledButton: false,
    time: 30,
    endTime: 0,
    score: 0,
    respondeu: false,
  };

  componentDidMount() {
    this.respostas();
    this.timer();
  }

  respostas = () => {
    const { perguntas: { results } } = this.props;
    const { idPergunta } = this.state;
    const answerArray = [
      results[idPergunta].correct_answer,
      ...(results[idPergunta].incorrect_answers)];
    const shuffledArray = this.getArray(answerArray);
    this.setState({ respostas: [...shuffledArray] });
  };

  timer = () => {
    const ONE_SECOND = 1000;
    const intervalo = setInterval(() => this.setState((prevState) => ({
      time: prevState.time - 1,
    })), ONE_SECOND);
    this.setState({ endTime: intervalo });
  };

  timerOver = () => {
    const { time, endTime } = this.state;
    if (time === 0) {
      clearTimeout(endTime);
      this.setState({ disabledButton: true });
    }
  };

  stopTimer = () => {
    const { endTime, time } = this.state;
    clearTimeout(endTime);
    this.setState({ disabledButton: true });
    console.log(time);
    // this.setState({ btnDasRespostas: true });
  };

  getArray = (array) => {
    let index = array.length;

    while (index > 0) {
      const random = Math.floor(Math.random() * index);
      index -= 1;
      [array[index], array[random]] = [array[random], array[index]];
    }
    return array;
  };

  handleClick = (event) => {
    const { dispatch } = this.props;
    this.setState({ btnDasRespostas: true });
    this.stopTimer();
    console.log(event.target);
    const numero10 = 10;
    let soma = 0;
    const numero3 = 3;
    const numero2 = 2;
    const numero1 = 1;
    const { time, idPergunta } = this.state;
    const { perguntas } = this.props;
    if (event.target.id === 'correct') {
      if (perguntas.results[idPergunta].difficulty === 'hard') {
        soma = numero10 + (time * numero3);
      }
      if (perguntas.results[idPergunta].difficulty === 'medium') {
        soma = numero10 + (time * numero2);
      }
      if (perguntas.results[idPergunta].difficulty === 'easy') {
        soma = numero10 + (time * numero1);
      }
    }
    this.setState({ score: soma, respondeu: true });
    dispatch(setScore(soma));
  };
  // 10 + (timer * dificuldade)
  // hard: 3, medium: 2, easy: 1

  valideNext = () => {
    const { history } = this.props;
    const { idPergunta } = this.state;
    const num = 4;
    if (idPergunta === num) {
      history.push('/feedback');
    }
    this.setState({
      idPergunta: idPergunta + 1,
      time: 30,
      btnDasRespostas: false,
      disabledButton: false,
    }, () => this.respostas());
    console.log(idPergunta);
    this.timer();
  };

  render() {
    const { perguntas: { results } } = this.props;
    const { idPergunta, respostas, btnDasRespostas, disabledButton,
      time, score, respondeu } = this.state;
    const perguntaAtual = results[idPergunta];
    this.timerOver();
    // this.pontuacao();
    // const { btnDasRespostas } = this.props;
    return (
      <section>
        <h1>{score}</h1>
        <h1>{time}</h1>
        <div>
          <h1 data-testid="question-category">
            {`${perguntaAtual.category}`}
          </h1>

          <h1 data-testid="question-text">
            {`${perguntaAtual.question.replace(/(&#039;)/g, '`').replace(/(&quot;)/g, '"')}`}
          </h1>
        </div>
        <div data-testid="answer-options" className="answer-options">
          {
            respostas.map((element, index) => {
              if (element === perguntaAtual.correct_answer) {
                return (
                  <button
                    className={ btnDasRespostas && 'correct' }
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                    value={ element }
                    onClick={ this.handleClick }
                    disabled={ disabledButton }
                    id="correct"
                  >
                    {element}
                  </button>
                );
              }
              return (
                <button
                  className={ btnDasRespostas && 'incorrect' }
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.handleClick }
                  disabled={ disabledButton }
                >
                  {element}
                </button>
              );
            })
          }
          { respondeu && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.valideNext }
            >
              Next
            </button>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.perg,
});

Questions.propTypes = {
  perguntas: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // btnDasRespostas: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Questions);
