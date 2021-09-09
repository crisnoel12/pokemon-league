import { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import * as actions from '../../store/actions/index';
import { POKEMON } from '../../types';
import PokemonSearch from '../../components/PokemonSearch/PokemonSearch';
import PokemonData from '../../components/PokemonData/PokemonData';
import PokemonLineup from '../../components/PokemonLineup/PokemonLineup';
import { INITIAL_STATE } from '../../store/reducers/reducer';
import RegisterPokemonLineupStyles from "./RegisterPokemonLineupStyles";
import { Grid, Typography } from '@material-ui/core';

interface PROPS extends INITIAL_STATE {
    doFetchPokemonHandler: (query: string) => any,
    doAddPokemonToLineupHandler: (pokemon: POKEMON) => any,
    doRemovePokemonFromLineupHandler: (pokemon: POKEMON) => void,
    doSelectPokemonHandler: (pokemon: POKEMON) => any,
    doDeselectPokemonHandler: () => any,
    doUpdatePokemonQueryHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    classes: { [key: string]: any }
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
            doSelectPokemonHandler,
            doDeselectPokemonHandler,
            doUpdatePokemonQueryHandler,
            selectedPokemon,
            pokemonLineup,
            isLoading,
            fetchedPokemon,
            pokemon404,
            pokemonQuery,
            classes
        } = this.props;
        return (
            <div style={{ padding: "30px" }}>
                <Grid container spacing={6}>
                    <Grid item xs={6}> {/* Pokemon Lineup + Data Column */}
                        <Typography variant={"h4"} className={classes.Pokemon_Lineup_Heading}>Pokemon Lineup</Typography>
                        <PokemonLineup
                            pokemonLineup={pokemonLineup}
                            doRemovePokemon={(pokemon: POKEMON) => doRemovePokemonFromLineupHandler(pokemon)} />
                        <PokemonData
                            selectedPokemon={selectedPokemon} 
                            deselectPokemon={doDeselectPokemonHandler}
                        />
                    </Grid>
                    <Grid item xs={6}> {/* Pokemon Search Column */}
                        <div className={classes.Pokedex}>
                            <form className={classes.Pokemon_Search_Form} onSubmit={this.fetchPokemonHandler}>
                                <input className={classes.Pokemon_Searchbox} type="text" name="query" placeholder="Search Pokemon (e.g. Pikachu and press enter)" value={pokemonQuery} onChange={doUpdatePokemonQueryHandler} />
                            </form>
                            <PokemonSearch
                                isLoading={isLoading}
                                fetchedPokemon={fetchedPokemon}
                                pokemon404={pokemon404}
                                pokemonQuery={pokemonQuery}
                                doSelectPokemon={() => fetchedPokemon && doSelectPokemonHandler(fetchedPokemon)}
                                doAddPokemon={() => this.addPokemonToLineupHandler()} 
                            />
                        </div>
                    </Grid>
                </Grid>
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
        doSelectPokemonHandler: (pokemon: POKEMON) => dispatch(actions.selectPokemon(pokemon)),
        doDeselectPokemonHandler: () => dispatch(actions.deselectPokemon()),
        doAddPokemonToLineupHandler: (pokemon: POKEMON) => dispatch(actions.addPokemonToLineup(pokemon)),
        doRemovePokemonFromLineupHandler: (pokemon: POKEMON) => dispatch(actions.removePokemonFromLineup(pokemon)),
        doUpdatePokemonQueryHandler: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(actions.updatePokemonQuery(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(RegisterPokemonLineupStyles)(RegisterPokemonLineup));