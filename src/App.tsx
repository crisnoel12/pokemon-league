import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStyles, withStyles } from '@material-ui/styles';

import Header from './components/UI/Header/Header';
import Hero from './components/Hero/Hero';
import RegisterPokemonLineup from './containers/RegisterPokemonLineup/RegisterPokemonLineup';
import PageNotFound from './components/UI/PageNotFound/PageNotFound';

const styles = createStyles({
  App: {
    textAlign: 'center'
  }
});

interface PROPS {
  classes: { [key: string]: any }
}

class App extends Component<PROPS> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.App}>
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

export default withStyles(styles)(App);
