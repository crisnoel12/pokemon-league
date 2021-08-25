import * as actionTypes from './actionTypes';
//@ts-ignore
import Pokedex from 'pokedex-promise-v2';
import { POKEMON } from '../../types';
import React from 'react';

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
        pokemon: pokemon
    }
}

export const fetchPokemonFail = (query: string) => {
    return {
        type: actionTypes.FETCH_POKEMON_FAIL,
        query: query
    }
}

export const fetchPokemon = (query: string) => {
    return (dispatch: any) => {
        dispatch(fetchPokemonStart());
        P.getPokemonByName(query.toLowerCase())
            .then((response: POKEMON) => {
                dispatch(fetchPokemonSuccess(response));
            })
            .catch((error: any) => {
                dispatch(fetchPokemonFail(query));
            });
    }
}

export const viewPokemonData = (pokemon: POKEMON) => {
    return {
        type: actionTypes.VIEW_POKEMON_DATA,
        pokemon: pokemon
    }
}

export const addPokemonToLineup = (pokemon: POKEMON) => {
    return {
        type: actionTypes.ADD_POKEMON_TO_LINEUP,
        pokemon: pokemon
    }
}

export const removePokemonFromLineup = (pokemon: POKEMON) => {
    return {
        type: actionTypes.REMOVE_POKEMON_FROM_LINEUP,
        pokemon
    }
}

export const updatePokemonQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    return {
        type: actionTypes.UPDATE_POKEMON_QUERY,
        pokemonQuery: e.target.value
    }
}