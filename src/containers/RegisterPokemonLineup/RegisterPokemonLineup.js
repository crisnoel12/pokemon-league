import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PokemonSearchPortrait from '../../components/PokemonSearchPortrait/PokemonSearchPortrait';
import PokemonDataPortrait from '../../components/PokemonDataPortrait/PokemonDataPortrait';
import PokemonLineupPortrait from '../../components/PokemonLineupPortrait/PokemonLineupPortrait';
import './RegisterPokemonLineup.css';

class RegisterPokemonLineup extends Component {
    state = {
        pokemonQueryString: ''
    }

    pokemonQueryChangedHandler = (event) => {
        this.setState({ pokemonQueryString: event.target.value.toLowerCase() });
    }

    fetchPokemonHandler = (event) => {
        event.preventDefault();
        if (this.state.pokemonQueryString !== '') {
            this.props.doFetchPokemonHandler(this.state.pokemonQueryString);
            this.failedQuery = this.state.pokemonQueryString;
        } else {
            alert("Please type in a pokemon name.")
        }
    }

    addPokemonToLineupHandler = () => {
        let checkForDuplicate = this.props.pokemonLineup.find(x => x.id === this.props.fetchedPokemon.id);
        if (checkForDuplicate !== undefined) {
            alert(this.props.fetchedPokemon.name + " is already in the lineup.");
        } else if (this.props.pokemonLineup.length < 6) {
            this.props.doAddPokemonToLineupHandler(this.props.fetchedPokemon);
        } else {
            alert("Pokemon lineup spots are filled.");
        }
    }
    render() {
        return (
            <div>
                <div className="Pokemon-form Flex-row Flex-2">

                    {/* Pokemon Lineup + Data Column */}
                    <div className="Col">
                        <div className="Pokemon-lineup">
                            <h2 className="text-left subheading">Pokemon Lineup</h2>
                            <PokemonLineupPortrait
                                pokemons={this.props.pokemonLineup}
                                doRemovePokemon={(id) => this.props.doRemovePokemonFromLineupHandler(id)} />
                        </div>
                        <div className="Pokemon-data">
                            <PokemonDataPortrait selectedPokemon={this.props.selectedPokemon} />
                        </div>
                    </div>

                    {/* Pokemon Search Column */}
                    <div className="Col">
                        <div className="Pokedex">
                            <form className="Pokemon-search-form" onSubmit={this.fetchPokemonHandler}>
                                <input type="text" name="query" placeholder="Search Pokemon (e.g. Pikachu and press enter)" value={this.state.pokemonQuery} onChange={this.pokemonQueryChangedHandler} />
                            </form>
                            <div className="Search-results">
                                <PokemonSearchPortrait
                                    isLoading={this.props.isLoading}
                                    pokemon={this.props.fetchedPokemon}
                                    pokemon404={this.props.pokemon404}
                                    failedQuery={this.failedQuery}
                                    doSelectPokemon={() => this.props.doViewPokemonDataHandler(this.props.fetchedPokemon)}
                                    doAddPokemon={() => this.addPokemonToLineupHandler()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fetchedPokemon: state.fetchedPokemon,
        pokemon404: state.pokemon404,
        selectedPokemon: state.selectedPokemon,
        pokemonLineup: state.pokemonLineup,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doFetchPokemonHandler: (query) => dispatch(actions.fetchPokemon(query)),
        doViewPokemonDataHandler: (pokemon) => dispatch(actions.viewPokemonData(pokemon)),
        doAddPokemonToLineupHandler: (pokemon) => dispatch(actions.addPokemonToLineup(pokemon)),
        doRemovePokemonFromLineupHandler: (id) => dispatch(actions.removePokemonFromLineup(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPokemonLineup);