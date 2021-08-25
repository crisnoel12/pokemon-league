import { INITIAL_STATE } from '../../store/reducers/reducer';
import Loader from '../UI/Loader/Loader';
import PokemonNotFound from '../UI/PokemonNotFound/PokemonNotFound';

type PROPS = Partial<INITIAL_STATE> & {
    doSelectPokemon: () => void,
    doAddPokemon: () => void
}
const PokemonSearchPortrait = (props: PROPS) => {
    const { fetchedPokemon, pokemonQuery, pokemon404, isLoading, doSelectPokemon, doAddPokemon } = props;
    let pokemonSearchResult = null;

    if (isLoading) {
        pokemonSearchResult = <Loader />;
    } else if (fetchedPokemon) {
        pokemonSearchResult = (
            <div className="Pokemon-portrait Col">
                <img src={fetchedPokemon.sprites.front_default} alt={fetchedPokemon.name} />
                <h4 className="Pokemon-name capitalize">{fetchedPokemon.name}</h4>
                <button className="btn btn-primary" onClick={doSelectPokemon}>Data</button>
                <button className="btn btn-success" onClick={doAddPokemon}>Add to Lineup</button>
            </div>
        );
    } else if (pokemon404) {
        pokemonSearchResult = <PokemonNotFound pokemonQuery={pokemonQuery} />;
    }

    return pokemonSearchResult;
};

export default PokemonSearchPortrait;