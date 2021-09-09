import { POKEMON, POKEMON_ACTION} from '../../types';
import * as actionTypes from '../actions/actionTypes';

export interface INITIAL_STATE {
    fetchedPokemon: POKEMON | null,
    pokemon404: boolean,
    selectedPokemon: POKEMON | null,
    pokemonLineup: POKEMON[],
    isLoading: boolean,
    pokemonQuery: string
}

const initalState: INITIAL_STATE = {
    fetchedPokemon: null,
    pokemon404: false,
    selectedPokemon: null,
    pokemonLineup: [],
    isLoading: false,
    pokemonQuery: ''
}

const reducer = (state: INITIAL_STATE = initalState, action: POKEMON_ACTION) => {
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
        case actionTypes.SELECT_POKEMON:
            return {
                ...state,
                selectedPokemon: action.pokemon
            };
        case actionTypes.DESELECT_POKEMON:
            return {
                ...state,
                selectedPokemon: null
            };
        case actionTypes.ADD_POKEMON_TO_LINEUP:
            return {
                ...state,
                pokemonLineup: state.pokemonLineup.concat(action.pokemon)
            };
        case actionTypes.REMOVE_POKEMON_FROM_LINEUP:
            return {
                ...state,
                pokemonLineup: state.pokemonLineup.filter((pokemon: POKEMON) => pokemon.id !== action.pokemon.id)
            };
        case actionTypes.UPDATE_POKEMON_QUERY:
            return {
                ...state,
                pokemonQuery: action.pokemonQuery
            }
        default:
            return state;
    }
}

export default reducer;