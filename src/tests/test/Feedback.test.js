import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
import Feedback from '../../pages/Feedback';

describe('testando a pagina feedback', () => {
  it('Verifica as mensagens de acertos e erro', () => {
    renderWithRouterAndRedux(<Feedback />);
    const questaoAcertadas = screen.getByTestId('feedback-total-question');
    const score = screen.getByTestId('feedback-total-score');
    const menssagem = screen.getByText('Could be better...');
    expect(menssagem).toBeInTheDocument();
    expect(questaoAcertadas).toBeInTheDocument();
    expect(score).toBeInTheDocument(); 
  });
  it('testando o botão de voltar para o inicio', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {},'/feedback');
    // const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play-again');

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    // await screen.findByText('Nome');

    const {location: { pathname }} = history;
    expect(pathname).toBe('/');
  });
  it('testando o botão de voltar para a o ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, {},'/feedback');
    // const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-ranking');

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    // await screen.findByText('Nome');

    const {location: { pathname }} = history;
    expect(pathname).toBe('/ranking');


  });

});
