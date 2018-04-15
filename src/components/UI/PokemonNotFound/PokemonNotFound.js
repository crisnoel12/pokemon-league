import React from 'react';
import './PokemonNotFound.css';

const PokemonNotFound = (props) => {
    return (
        <div className="Col">
          <p className="Pokemon-404-msg">Sorry, the pokemon `{props.query}` could not be found.</p>
          <div className="Pokemon-404-img"></div>
        </div>
    );
};

export default PokemonNotFound;