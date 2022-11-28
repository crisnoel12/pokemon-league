import { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import HeroStyles from './HeroStyles';
import AuthUserContext from '../../context/AuthUserContext';

const Hero = () => {
  // variables
  const classes = HeroStyles();
  const { authUser } = useContext(AuthUserContext);
  
  return authUser ? (
    <Redirect to={`/profile/${authUser}`} />
  ) : (
    <Grid container className={classes.root}>
      <img className={classes.Pokemon_Hero_Img} src="https://media.giphy.com/media/8M8OxFRXpLFAI/giphy.gif" alt="Ash and Pikachu"/>
      <div className={classes.overlay}></div>
    </Grid> 
  );
};

export default Hero;