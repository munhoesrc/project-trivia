import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/Jogo" component={ Jogo } /> */}
    </Switch>
  );
}
