import { POKEMON_ACTION, POKEAPI_INITIAL_STATE} from '../../../types';
import * as actionTypes from '../../actions/PokeAPI/actionTypes';

const initalState: POKEAPI_INITIAL_STATE = {
    fetchedPokemon: null,
    pokemon404: false,
    selectedPokemon: null,
    isLoading: false,
    pokemonQuery: ''
}

const PokeAPIReducer = (state: POKEAPI_INITIAL_STATE = initalState, action: POKEMON_ACTION) => {
    switch(action.type) {
        case actionTypes.FETCH_POKEMON_START:
            return {
                ...state,
                isLoading: true,
                selectedPokemon: null
            };
        case actionTypes.FETCH_POKEMON_SUCCESS:
            const { base_experience, forms, game_indices, held_items, is_default, location_area_encounters, order, past_types, ...rest } = action.pokemon
            return {
                ...state,
                fetchedPokemon: rest,
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
        case actionTypes.UPDATE_POKEMON_QUERY:
            if (action.pokemonQuery === "") {
                return {
                    ...state,
                    pokemonQuery: action.pokemonQuery,
                    fetchedPokemon: null,
                    pokemon404: false
                }
            }
            return {
                ...state,
                pokemonQuery: action.pokemonQuery
            }
        default:
            return state;
    }
}

export { PokeAPIReducer };