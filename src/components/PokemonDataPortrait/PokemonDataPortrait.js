import React from 'react';

const PokemonDataPortrait = (props) => {
    let pokemonData = null;

    if (props.selectedPokemon !== null) {
        let pokemon = props.selectedPokemon;
        let pokemonTypes = pokemon.types.map((type, i, arr) => {
            if (arr.length - 1 === i) {
                return (
                    <span key={i}>
                        <span className="bold capitalize">{type.type.name}</span>
                    </span>
                )
            } else {
                return (
                    <span key={i}>
                        <span className="bold capitalize">{type.type.name}</span>,&nbsp;
            </span>
                )
            }
        });
        let pokemonAbilities = pokemon.abilities.map((ability, i, arr) => {
            if (arr.length - 1 === i) {
                return (
                    <span key={i}>
                        <span className="bold capitalize">{ability.ability.name}</span>
                    </span>
                )
            } else {
                return (
                    <span key={i}>
                        <span className="bold capitalize">{ability.ability.name}</span>,&nbsp;
            </span>
                )
            }
        });
        let pokemonStats = pokemon.stats.slice(0).reverse().map((stat, i) => {
            return (
                <li key={i}><span className="bold capitalize">{stat.stat.name}:</span> <span>{stat.base_stat}</span></li>
            );
        });
        pokemonData = (
            <div>
                <h2 className="text-left subheading">Pokemon Data</h2>
                <div className="Flex-row Flex-1">
                    <div className="Pokemon-portrait Col">
                        <div className="Flex-row Flex-3">
                            <div className="Col">
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <h4 className="Pokemon-name capitalize">{pokemon.name}</h4>
                            </div>
                            <div className="Col types abilities text-left-md">
                                <p>Type(s): {pokemonTypes}</p>
                                <p className="float-left-md">Abilities: {pokemonAbilities} </p>
                            </div>
                            <div className="Col stats text-left-md">
                                <p className="float-left-md">Stats:</p>
                                <ul className="float-left-md margin-top-em1 margin-left-10">
                                    {pokemonStats}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return pokemonData;
};

export default PokemonDataPortrait;