import React from 'react';
import { POKEMON } from '../../../types';
import * as actionTypes from './actionTypes';
//@ts-ignore
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

export const fetchPokemonSuccess = (pokemon: POKEMON) => {
    return {
        type: actionTypes.FETCH_POKEMON_SUCCESS,
        pokemon
    }
}

export const fetchPokemonFail = (query: string) => {
    return {
        type: actionTypes.FETCH_POKEMON_FAIL,
        query
    }
}

export const fetchPokemon = (query: string) => {
    return (dispatch: any) => {
        dispatch(fetchPokemonStart());
        P.getPokemonByName(query.toLowerCase())
            .then((response: POKEMON) => dispatch(fetchPokemonSuccess(response)))
            .catch((error: any) => dispatch(fetchPokemonFail(query)));
    }
}

export const selectPokemon = (pokemon: POKEMON) => {
    return {
        type: actionTypes.SELECT_POKEMON,
        pokemon
    }
}

export const deselectPokemon = () => {
    return {
        type: actionTypes.DESELECT_POKEMON
    }
}

export const updatePokemonQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    return {
        type: actionTypes.UPDATE_POKEMON_QUERY,
        pokemonQuery: e.target.value
    }
    
}