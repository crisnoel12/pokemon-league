export interface USER {
  __v?: number,
  _id: string,
  pokemonLineup: any,
  username: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  gender: 'm' | 'f' | '',
  birthdate: Date | string,
  password: string,
  confirm_password?: string
}

export type AUTHUSER = string | null;

export interface AUTHUSERCONTEXT {
  authUser: AUTHUSER,
  setAuthUser: (user: string) => any
}

export interface POKEMON {
  abilities: {[key: string]: any}[],
  base_experience?: number,
  forms?: {[key: string]: any},
  game_indices?: {[key: string]: any}[],
  height: number,
  held_items?: {[key: string]: any}[],
  id: number,
  is_default?: boolean,
  location_area_encounters?: string,
  moves: {[key: string]: any}[],
  name: string,
  order?: number,
  past_types?: [],
  species: {[key: string]: any},
  sprites: {[key: string]: any},
  stats: {[key: string]: any},
  types: {[key: string]: any},
  weight: number
}

export interface POKEMON_ACTION {
  type: string,
  pokemon: POKEMON,
  pokemonQuery?: string,
}

export interface POKEAPI_INITIAL_STATE {
  fetchedPokemon: POKEMON | null,
  pokemon404: boolean,
  selectedPokemon: POKEMON | null,
  isLoading: boolean,
  pokemonQuery: string
}

export interface USER_PROFILE_INITIAL_STATE {
  user: USER | null,
  isAuthProfile: boolean,
  isProfile404: boolean,
  isLoading: boolean,
  error: string
}