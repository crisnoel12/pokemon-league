import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { POKEMON } from '../../types';
import PokemonSearchPortrait from '../../components/PokemonSearchPortrait/PokemonSearchPortrait';
import PokemonDataPortrait from '../../components/PokemonDataPortrait/PokemonDataPortrait';
import PokemonLineupPortrait from '../../components/PokemonLineupPortrait/PokemonLineupPortrait';
import './RegisterPokemonLineup.css';
import { INITIAL_STATE } from '../../store/reducers/reducer';

type PROPS = INITIAL_STATE & {
    doFetchPokemonHandler: (query: string) => any,
    doAddPokemonToLineupHandler: (pokemon: POKEMON) => any,
    doRemovePokemonFromLineupHandler: (pokemon: POKEMON) => void,
    doViewPokemonDataHandler: (pokemon: POKEMON) => any,
    doUpdatePokemonQueryHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

class RegisterPokemonLineup extends Component<PROPS> {

    fetchPokemonHandler = (event: any) => {
        event.preventDefault();
        const { doFetchPokemonHandler, pokemonQuery } = this.props;

        if (pokemonQuery !== '') {
            doFetchPokemonHandler(pokemonQuery);
        } else {
            alert("Please type in a pokemon name.")
        }
    }

    addPokemonToLineupHandler = () => {
        const { pokemonLineup, fetchedPokemon, doAddPokemonToLineupHandler } = this.props;
        const checkForDuplicate = fetchedPokemon && pokemonLineup.find((p: POKEMON) => p.id === fetchedPokemon.id);
        if (fetchedPokemon && checkForDuplicate !== undefined) {
            alert(fetchedPokemon.name + " is already in the lineup.");
        } else if (fetchedPokemon && pokemonLineup.length < 6) {
            doAddPokemonToLineupHandler(fetchedPokemon);
        } else {
            alert("Pokemon lineup spots are filled.");
        }
    }
    render() {
        const { 
            doRemovePokemonFromLineupHandler,
            doViewPokemonDataHandler,
            doUpdatePokemonQueryHandler,
            selectedPokemon,
            pokemonLineup,
            isLoading,
            fetchedPokemon,
            pokemon404,
            pokemonQuery
        } = this.props;
        return (
            <div>
                <div className="Pokemon-form Flex-row Flex-2">

                    {/* Pokemon Lineup + Data Column */}
                    <div className="Col">
                        <div className="Pokemon-lineup">
                            <h2 className="text-left subheading">Pokemon Lineup</h2>
                            <PokemonLineupPortrait
                                pokemonLineup={pokemonLineup}
                                doRemovePokemon={(pokemon: POKEMON) => doRemovePokemonFromLineupHandler(pokemon)} />
                        </div>
                        <div className="Pokemon-data">
                            <PokemonDataPortrait selectedPokemon={selectedPokemon} />
                        </div>
                    </div>

                    {/* Pokemon Search Column */}
                    <div className="Col">
                        <div className="Pokedex">
                            <form className="Pokemon-search-form" onSubmit={this.fetchPokemonHandler}>
                                <input type="text" name="query" placeholder="Search Pokemon (e.g. Pikachu and press enter)" value={pokemonQuery} onChange={doUpdatePokemonQueryHandler} />
                            </form>
                            <div className="Search-results">
                                <PokemonSearchPortrait
                                    isLoading={isLoading}
                                    fetchedPokemon={fetchedPokemon}
                                    pokemon404={pokemon404}
                                    pokemonQuery={pokemonQuery}
                                    doSelectPokemon={() => fetchedPokemon && doViewPokemonDataHandler(fetchedPokemon)}
                                    doAddPokemon={() => this.addPokemonToLineupHandler()} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: INITIAL_STATE) => {
    return {
        fetchedPokemon: state.fetchedPokemon,
        pokemon404: state.pokemon404,
        selectedPokemon: state.selectedPokemon,
        pokemonLineup: state.pokemonLineup,
        isLoading: state.isLoading,
        pokemonQuery: state.pokemonQuery
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        doFetchPokemonHandler: (query: string) => dispatch(actions.fetchPokemon(query)),
        doViewPokemonDataHandler: (pokemon: POKEMON) => dispatch(actions.viewPokemonData(pokemon)),
        doAddPokemonToLineupHandler: (pokemon: POKEMON) => dispatch(actions.addPokemonToLineup(pokemon)),
        doRemovePokemonFromLineupHandler: (pokemon: POKEMON) => dispatch(actions.removePokemonFromLineup(pokemon)),
        doUpdatePokemonQueryHandler: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(actions.updatePokemonQuery(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPokemonLineup);