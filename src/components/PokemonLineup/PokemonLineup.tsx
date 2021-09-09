import { Card, Grid, Typography, capitalize } from '@material-ui/core';
import { INITIAL_STATE } from '../../store/reducers/reducer';
import { POKEMON } from '../../types';
import PokemonPortrait from '../PokemonPortrait/PokemonPortrait';
import PokemonPortraitStyles from '../PokemonPortrait/PokemonPortraitStyles';
import { makeStyles, Theme } from '@material-ui/core';
import CloseButton from '../UI/CloseButton/CloseButton';

interface PROPS extends Partial<INITIAL_STATE> {
    doRemovePokemon: (pokemon: POKEMON) => void
}

const useStyles = makeStyles((theme: Theme) => ({
    cardRoot: {
        backgroundColor: "yellowgreen",
        color: "white",
        padding: theme.spacing(4),
        borderRadius: theme.spacing(1)
    }
}));

const PokemonLineup = (props: PROPS) => {
    const classes = useStyles();
    const pokemonPortraitClasses = PokemonPortraitStyles();
    const { pokemonLineup, doRemovePokemon } = props;

    let pokemonLineupDisplay = null;

    if (pokemonLineup && pokemonLineup.length === 0) {
        pokemonLineupDisplay = (
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.cardRoot}>
                        <Typography>Search for pokemon to add to your lineup. Maximum (6).</Typography>
                    </Card>
                </Grid>
            </Grid>
        );
    } else {
        pokemonLineupDisplay = (
            <Grid container spacing={1}>
                {pokemonLineup && pokemonLineup.map((pokemon: POKEMON, i: number) => {
                    return (
                        <Grid item xs={4}>
                            <PokemonPortrait key={`${i + 1}`}>
                                <span className={pokemonPortraitClasses.Pokemon_Lineup_Number}>{i + 1}</span>
                                <CloseButton disableContainer={true} title={"Remove " + capitalize(pokemon.name)} onClose={() => doRemovePokemon(pokemon)} />
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <Typography variant={"h6"} className={pokemonPortraitClasses.Pokemon_Name}>{pokemon.name}</Typography>
                            </PokemonPortrait>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }

    return pokemonLineupDisplay;
};

export default PokemonLineup;