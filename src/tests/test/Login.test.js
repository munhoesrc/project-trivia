import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import App from '../../App';

describe('Testando a aplicação Trivia:', () => {
  it('Verificado a página de Login', () => {
    renderWithRouterAndRedux(<App />);

    const emailCorrect = 'cerveja@teste.com';
    const nameCorrect = 'Tryber'

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    expect(buttonPlay).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputEmail, emailCorrect);
    userEvent.click(buttonPlay);
    userEvent.type(inputName, nameCorrect);

  });
  it("Verificando o redirecionamento do botão configuração", async () => {

    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByRole('button', { name: /configuração/i });

    expect(buttonSettings).toBeInTheDocument();

    userEvent.click(buttonSettings);
    await screen.findByText('Config');

    const { location: { pathname } } = history;

    expect(pathname).toBe("/config");
  });
  it("Verificando o redirecionamento do botão play ", async () => {

    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");

    userEvent.type(inputEmail, 'cerveja@teste.com');
    userEvent.type(inputName, 'Tryber');

    const buttonPlay = screen.getByTestId("btn-play");

    userEvent.click(buttonPlay);
    await screen.findByText('Game');

    const { location: { pathname } } = history;

    expect(pathname).toBe("/game");
  });
});