import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { fetchPerguntas } from '../redux/actions/index';

class Game extends Component {
  state = {
    carregando: true,
  };

  componentDidMount() {
    const { getPerg } = this.props;
    getPerg();
  }

  componentDidUpdate() {
    const { req } = this.props;
    const { carregando } = this.state;
    this.validationLogout();
    if (Object.keys(req).length > 0 && carregando) {
      this.setState({ carregando: false });
    }
  }

  validationLogout = () => {
    const { req: { response_code: responseCode }, history } = this.props;
    const codeExpirado = 3;
    if (responseCode === codeExpirado) {
      history.push('/');
    }
  };

  render() {
    const { carregando } = this.state;
    return (
      <>
        <Header />
        <div className="container">
          <section className="div-questions">
            { !carregando && <Questions /> }
            {carregando && <div className="loading" /> }
          </section>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPerg: () => dispatch(fetchPerguntas()),
});

const mapStateToProps = (state) => ({
  req: state.perg,
});

Game.propTypes = {
  getPerg: PropTypes.func.isRequired,
  req: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
