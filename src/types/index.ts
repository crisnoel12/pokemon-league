export type POKEMON = {
  abilities: {[key: string]: any}[],
  base_experience: number,
  forms: {[key: string]: any},
  game_indices: {[key: string]: any}[],
  height: number,
  held_items: {[key: string]: any}[],
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: {[key: string]: any}[],
  name: string,
  order: number,
  past_types: [],
  species: {[key: string]: any},
  sprites: {[key: string]: any},
  stats: {[key: string]: any},
  types: {[key: string]: any},
  weight: number
}

export type POKEMON_ACTION = {
  type: string,
  pokemon: POKEMON,
  pokemonQuery?: string
}

export type DispatchType = (args: POKEMON_ACTION) => POKEMON_ACTION