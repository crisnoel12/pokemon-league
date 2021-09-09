import { Button, ButtonGroup, Typography } from '@material-ui/core';
import { INITIAL_STATE } from '../../store/reducers/reducer';
import PokemonPortrait from '../PokemonPortrait/PokemonPortrait';
import PokemonPortraitStyles from '../PokemonPortrait/PokemonPortraitStyles';
import Loader from '../UI/Loader/Loader';
import PokemonNotFound from '../UI/PokemonNotFound/PokemonNotFound';

interface PROPS extends Partial<INITIAL_STATE> {
    doSelectPokemon: () => void,
    doAddPokemon: () => void
}
const PokemonSearch = (props: PROPS) => {
    const pokemonPortraitClasses = PokemonPortraitStyles();
    const { fetchedPokemon, pokemonQuery, pokemon404, isLoading, doSelectPokemon, doAddPokemon } = props;
    let pokemonSearchResult = null;

    if (isLoading) {
        pokemonSearchResult = <Loader />;
    } else if (fetchedPokemon) {
        pokemonSearchResult = (
            <PokemonPortrait key={"PokemonSearchPortrait"}>
                <img src={fetchedPokemon.sprites.front_default} alt={fetchedPokemon.name} />
                <Typography variant={"h6"} className={pokemonPortraitClasses.Pokemon_Name}>{fetchedPokemon.name}</Typography>
                <ButtonGroup fullWidth>
                    <Button fullWidth variant={"contained"} color={"primary"} onClick={doSelectPokemon}>Data</Button>
                    <Button fullWidth variant={"contained"} color={"secondary"} onClick={doAddPokemon}>Add to Lineup</Button>
                </ButtonGroup>
            </PokemonPortrait>
        );
    } else if (pokemon404) {
        pokemonSearchResult = <PokemonNotFound pokemonQuery={pokemonQuery} />;
    }

    return pokemonSearchResult;
};

export default PokemonSearch;