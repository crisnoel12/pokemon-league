import { AUTHUSER, POKEMON } from '../../../types';
import * as actionTypes from './actionTypes';
import { ApiManager } from '../../../helpers/ApiManager';
import { Dispatch } from 'redux';
import { USER } from '../../../types/index';

function dispatchToReducer(dispatch: Dispatch, actionType: any, payload: any, other?: any) {
  dispatch({ type: actionType, payload, ...other });
  return payload;
}

export const loadProfile = (authUser: AUTHUSER, userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadProfileStart());
    try {
      const success: any = await ApiManager.getProfile(userId);
      dispatchToReducer(dispatch, actionTypes.LOAD_PROFILE_SUCCESS, success.data, { isAuthProfile: authUser === userId });
    } catch (error: any) {
      console.error(error.response.data);
      dispatchToReducer(dispatch, actionTypes.LOAD_PROFILE_FAIL, error);
    }
  }
}

export const loadProfileStart = () => {
  return {
    type: actionTypes.LOAD_PROFILE_START
  }
}


export const addPokemonToLineup = (authUser: AUTHUSER, pokemon: POKEMON, pokemonLineup: POKEMON[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(addPokemonToLineUpStart());
    const newPokemonLineup = {
      pokemonLineup: pokemonLineup.concat(pokemon)
    };
    try {
      const response = await ApiManager.updateProfile(authUser, newPokemonLineup);
      dispatchToReducer(dispatch, actionTypes.ADD_POKEMON_TO_LINEUP_SUCCESS, response.data);
    } catch (error: any) {
      console.log(error.response.data);
      dispatchToReducer(dispatch, actionTypes.ADD_POKEMON_TO_LINEUP_FAIL, error);
    }
  }
}

export const addPokemonToLineUpStart = () => {
  return {
    type: actionTypes.ADD_POKEMON_TO_LINEUP_START
  }
}

export const removePokemonFromLineup = (authUser: AUTHUSER, pokemon: POKEMON, pokemonLineup: POKEMON[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(removePokemonFromLineupStart());
    const newPokemonLineup = {
      pokemonLineup: pokemonLineup.filter((p: POKEMON) => p.id !== pokemon.id)
    };
    try {
      const response = await ApiManager.updateProfile(authUser, newPokemonLineup);
      dispatchToReducer(dispatch, actionTypes.REMOVE_POKEMON_FROM_LINEUP_SUCCESS, response.data);
    } catch (error: any) {
      console.log(error.response.data);
      dispatchToReducer(dispatch, actionTypes.REMOVE_POKEMON_FROM_LINEUP_FAIL, error);
    }
  }
}

export const removePokemonFromLineupStart = () => {
  return {
    type: actionTypes.REMOVE_POKEMON_FROM_LINEUP_START
  }
}

export const updateProfile = (authUser: AUTHUSER, user: USER) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateProfileStart());
    try {
      dispatchToReducer(dispatch, actionTypes.UPDATE_PROFILE_SUCCESS, user);
    } catch (error: any) {
      console.log(error.response.data);
      dispatchToReducer(dispatch, actionTypes.UPDATE_PROFILE_FAIL, error);
    }
  }
}

export const updateProfileStart = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_START
  }
}