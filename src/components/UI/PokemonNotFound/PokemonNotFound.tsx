import { Typography } from '@material-ui/core';
import { INITIAL_STATE } from '../../../store/reducers/reducer';
import PokemonNotFoundStyles from './PokemonNotFoundStyles';

interface PROPS extends Partial<INITIAL_STATE> {}

const PokemonNotFound = ({ pokemonQuery }: PROPS) => {
  const classes = PokemonNotFoundStyles();
    return (
        <div>
          <Typography className={classes.Pokemon_404_msg}>Sorry, the pokemon `{pokemonQuery}` could not be found.</Typography>
          <div className={classes.Pokemon_404_img}></div>
        </div>
    );
};

export default PokemonNotFound;