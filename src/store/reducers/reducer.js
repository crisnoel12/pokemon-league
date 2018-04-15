import * as actionTypes from '../actions/actionTypes';

const initalState = {
    fetchedPokemon: null,
    pokemon404: false,
    selectedPokemon: null,
    pokemonLineup: [],
    isLoading: false
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POKEMON_START:
            return {
                ...state,
                isLoading: true,
                selectedPokemon: null
            };
        case actionTypes.FETCH_POKEMON_SUCCESS:
            return {
                ...state,
                fetchedPokemon: action.pokemon,
                pokemon404: false,
                isLoading: false
            };
        case actionTypes.FETCH_POKEMON_FAIL:
            return {
                ...state,
                fetchedPokemon: null,
                pokemon404: true,
                isLoading: false
            };
        case actionTypes.VIEW_POKEMON_DATA:
            return {
                ...state,
                selectedPokemon: action.pokemon
            };
        case actionTypes.ADD_POKEMON_TO_LINEUP:
            return {
                ...state,
                pokemonLineup: state.pokemonLineup.concat(action.pokemon)
            };
        case actionTypes.REMOVE_POKEMON_FROM_LINEUP:
            return {
                ...state,
                pokemonLineup: state.pokemonLineup.filter((pokemon) => pokemon.id !== action.id)
            };
        default:
            return state;
    }
}

export default reducer;