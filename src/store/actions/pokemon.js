import * as actionTypes from './actionTypes';
import Pokedex from 'pokedex-promise-v2';

let options ={
    protocol: 'https'
}

let P = new Pokedex(options); // init PokeApi wrapper with options

export const fetchPokemonStart = () => {
    return {
        type: actionTypes.FETCH_POKEMON_START
    }
}

export const fetchPokemonSuccess = (pokemon) => {
    return {
        type: actionTypes.FETCH_POKEMON_SUCCESS,
        pokemon: pokemon
    }
}

export const fetchPokemonFail = (query) => {
    return {
        type: actionTypes.FETCH_POKEMON_FAIL,
        query: query
    }
}

export const fetchPokemon = (query) => {
    return dispatch => {
        dispatch(fetchPokemonStart());
        P.getPokemonByName(query)
            .then((response) => {
                dispatch(fetchPokemonSuccess(response));
            })
            .catch((error) => {
                dispatch(fetchPokemonFail(query));
            });
    }
}

export const viewPokemonData = (pokemon) => {
    return {
        type: actionTypes.VIEW_POKEMON_DATA,
        pokemon: pokemon
    }
}

export const addPokemonToLineup = (pokemon) => {
    return {
        type: actionTypes.ADD_POKEMON_TO_LINEUP,
        pokemon: pokemon
    }
}

export const removePokemonFromLineup = (id) => {
    return {
        type: actionTypes.REMOVE_POKEMON_FROM_LINEUP,
        id: id
    }
}