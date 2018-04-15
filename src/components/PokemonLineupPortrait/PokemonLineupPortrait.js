import React from 'react';

const PokemonLineupPortrait = (props) => {
    let pokemonLineup = null;

    if (props.pokemons.length === 0) {
        pokemonLineup = (
            <div className="Flex-row Flex-1">
                <div className="Info-block Col">
                    <p>Search for pokemon to add to your lineup.</p>
                </div>
            </div>
        );
    } else {
        pokemonLineup = (
            <div className="Flex-row Flex-3">
                {props.pokemons.map((pokemon, i) => {
                    return (
                        <div className="Pokemon-portrait Col" key={i + 1}>
                            <span className="Pokemon-lineup-number">{i + 1}</span>
                            <span className="Pokemon-lineup-remove" title={"Remove " + pokemon.name} onClick={() => props.doRemovePokemon(pokemon.id)}>&times;</span>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <h4 className="Pokemon-name capitalize">{pokemon.name}</h4>
                        </div>
                    );
                })}
            </div>
        );
    }

    return pokemonLineup;
};

export default PokemonLineupPortrait;