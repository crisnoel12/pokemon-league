import React from 'react';
import { INITIAL_STATE } from '../../store/reducers/reducer';
import { POKEMON } from '../../types';

type PROPS = Partial<INITIAL_STATE> & {
    doRemovePokemon: (pokemon: POKEMON) => void
}

const PokemonLineupPortrait = (props: PROPS) => {
    const { pokemonLineup, doRemovePokemon } = props;

    let pokemonLineupDisplay = null;

    if (pokemonLineup && pokemonLineup.length === 0) {
        pokemonLineupDisplay = (
            <div className="Flex-row Flex-1">
                <div className="Info-block Col">
                    <p>Search for pokemon to add to your lineup. Maximum (6).</p>
                </div>
            </div>
        );
    } else {
        pokemonLineupDisplay = (
            <div className="Flex-row Flex-3">
                {pokemonLineup && pokemonLineup.map((pokemon: POKEMON, i: number) => {
                    return (
                        <div className="Pokemon-portrait Col" key={i + 1}>
                            <span className="Pokemon-lineup-number">{i + 1}</span>
                            <span className="Pokemon-lineup-remove" title={"Remove " + pokemon.name} onClick={() => doRemovePokemon(pokemon)}>&times;</span>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <h4 className="Pokemon-name capitalize">{pokemon.name}</h4>
                        </div>
                    );
                })}
            </div>
        );
    }

    return pokemonLineupDisplay;
};

export default PokemonLineupPortrait;