import { USER_PROFILE_INITIAL_STATE } from '../../../types';
import * as actionTypes from '../../actions/UserProfile/actionTypes';

const initalState: USER_PROFILE_INITIAL_STATE = {
  user: null,
  isAuthProfile: false,
  isProfile404: false,
  isLoading: false,
  error: ""
}

const UserProfileReducer = (state: USER_PROFILE_INITIAL_STATE = initalState, action: any) => {
    switch(action.type) {
      case actionTypes.LOAD_PROFILE_START:
        return {
            ...state,
            isLoading: true,
            user: null
        };
      case actionTypes.LOAD_PROFILE_SUCCESS:
        return {
            ...state,
            user: action.payload,
            isAuthProfile: action.isAuthProfile,
            isLoading: false,
            isProfile404: false
        };
      case actionTypes.LOAD_PROFILE_FAIL:
        return {
            ...state,
            user: null,
            error: action.payload,
            isLoading: false,
            isProfile404: true
        };
      case actionTypes.ADD_POKEMON_TO_LINEUP_START:
        return {
            ...state,
            isLoading: true,
        };
      case actionTypes.ADD_POKEMON_TO_LINEUP_SUCCESS:
        return {
            ...state,
            user: {
              ...state.user,
              ...action.payload.user
            },
            isLoading: false,
        };
      case actionTypes.ADD_POKEMON_TO_LINEUP_FAIL:
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
      case actionTypes.REMOVE_POKEMON_FROM_LINEUP_START:
        return {
            ...state,
            isLoading: true,
        };
      case actionTypes.REMOVE_POKEMON_FROM_LINEUP_SUCCESS:
        return {
            ...state,
            user: {
              ...state.user,
              ...action.payload.user
            },
            isLoading: false,
        };
      case actionTypes.REMOVE_POKEMON_FROM_LINEUP_FAIL:
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
      case actionTypes.UPDATE_PROFILE_START:
        return {
            ...state,
            isLoading: true,
        };
      case actionTypes.UPDATE_PROFILE_SUCCESS:
        return {
            ...state,
            user: {
              ...state.user,
              ...action.payload.user
            },
            isLoading: false,
        };
      case actionTypes.UPDATE_PROFILE_FAIL:
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
      default:
          return state;
    }
}

export { UserProfileReducer };