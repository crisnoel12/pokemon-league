import React from 'react';
import { INITIAL_STATE } from '../../../store/reducers/reducer';
import './PokemonNotFound.css';

type PROPS = Partial<INITIAL_STATE>;

const PokemonNotFound = ({ pokemonQuery }: PROPS) => {
    return (
        <div className="Col">
          <p className="Pokemon-404-msg">Sorry, the pokemon `{pokemonQuery}` could not be found.</p>
          <div className="Pokemon-404-img"></div>
        </div>
    );
};

export default PokemonNotFound;