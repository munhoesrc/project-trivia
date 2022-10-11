import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Perguntas extends Component {
  state = {
    idPergunta: '0',
    respostas: [],
    btnDasRespostas: false,
  };

  componentDidMount() {
    const { perguntas: { results } } = this.props;
    const { idPergunta } = this.state;
    const answerArray = [
      results[idPergunta].correct_answer,
      ...(results[idPergunta].incorrect_answers)];
    const shuffledArray = this.getArray(answerArray);
    this.setState({ respostas: [...shuffledArray] });
  }

  getArray = (array) => {
    let index = array.length;

    while (index > 0) {
      const random = Math.floor(Math.random() * index);
      index -= 1;
      [array[index], array[random]] = [array[random], array[index]];
    }
    return array;
  };

  handleClick = () => {
    this.setState({ btnDasRespostas: true });
  };

  render() {
    const { perguntas: { results } } = this.props;
    const { idPergunta, respostas, btnDasRespostas } = this.state;
    const perguntaAtual = results[idPergunta];
    // const { btnDasRespostas } = this.props;
    return (
      <section>
        <div className="question-category">
          <h1 data-testid="question-category">
            {`Categoria: ${perguntaAtual.category}`}
          </h1>

          <h1 data-testid="question-text">
            {`Pergunta: ${perguntaAtual.question.replace(/(&#039;)/g, '`').replace(/(&quot;)/g, '"')}`}
          </h1>
        </div>
        <div data-testid="answer-options" className="answer-options">
          {
            respostas.map((element, index) => {
              if (element === perguntaAtual.correct_answer) {
                return (
                  <button
                    className={ btnDasRespostas ? 'correct' : 'btn-check' }
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                    value={ element }
                    onClick={ this.handleClick }
                  >
                    {element}
                  </button>
                );
              }
              return (
                <button
                  className={ btnDasRespostas ? 'incorrect' : 'btn-check' }
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.handleClick }
                >
                  {element}
                </button>
              );
            })
          }

        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.perg,
});

Perguntas.propTypes = {
  perguntas: PropTypes.objectOf(PropTypes.shape).isRequired,
  // btnDasRespostas: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Perguntas);
