import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HeroStyles from './HeroStyles';

const Hero = () => {
  const classes = HeroStyles();
  return (
      <Grid container className={classes.root}>
        <img className={classes.Pokemon_Hero_Img} src="https://media.giphy.com/media/8M8OxFRXpLFAI/giphy.gif" alt="Ash and Pikachu"/>
        <div className={classes.overlay}></div>
        <Link className={classes.Hero_Btn} to="/register-pokemon-lineup">Register Your Pokemon</Link>
      </Grid> 
  );
};

export default Hero;