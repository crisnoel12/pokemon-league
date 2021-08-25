import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/UI/Header/Header';
import Hero from './components/Hero/Hero';
import RegisterPokemonLineup from './containers/RegisterPokemonLineup/RegisterPokemonLineup';
import PageNotFound from './components/UI/PageNotFound/PageNotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/register-pokemon-lineup" component={RegisterPokemonLineup}/>
          <Route path="/" exact component={Hero}/>  
          <Route path="*" component={PageNotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
