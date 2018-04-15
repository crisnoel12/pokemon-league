import React from 'react';
import Loader from '../UI/Loader/Loader';
import PokemonNotFound from '../UI/PokemonNotFound/PokemonNotFound';

const PokemonSearchPortrait = (props) => {
    let pokemonSearchResult = null;

    if (props.isLoading) {
        pokemonSearchResult = <Loader />;
    } else if (props.pokemon !== null) {
        let pokemon = props.pokemon;
        pokemonSearchResult = (
            <div className="Pokemon-portrait Col">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h4 className="Pokemon-name capitalize">{pokemon.name}</h4>
                <button className="btn btn-primary" onClick={props.doSelectPokemon}>Data</button>
                <button className="btn btn-success" onClick={props.doAddPokemon}>Add to Lineup</button>
            </div>
        );
    } else if (props.pokemon404) {
        pokemonSearchResult = <PokemonNotFound query={props.failedQuery} />;
    }

    return pokemonSearchResult;
};

export default PokemonSearchPortrait;