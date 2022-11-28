import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { POKEAPI_INITIAL_STATE } from "../../types";
import PokemonPortrait from "../PokemonPortrait/PokemonPortrait";
import PokemonPortraitStyles from "../PokemonPortrait/PokemonPortraitStyles";
import CloseButton from "../UI/CloseButton/CloseButton";
import Loader from "../UI/Loader/Loader";
import PokemonNotFound from "../UI/PokemonNotFound/PokemonNotFound";
import PokemonSearchStyles from "./PokemonSearchStyles";

interface PROPS extends Partial<POKEAPI_INITIAL_STATE> {
  doSelectPokemon: () => void;
  doAddPokemon: () => void;
  clearPokemonQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PokemonSearch = (props: PROPS) => {
  const pokemonPortraitClasses = PokemonPortraitStyles();
  const pokemonSearchClasses = PokemonSearchStyles();
  const {
    fetchedPokemon,
    pokemonQuery,
    pokemon404,
    isLoading,
    doSelectPokemon,
    doAddPokemon,
    clearPokemonQuery,
  } = props;
  const [display, setDisplay] = useState<any>(null);

  useEffect(() => {
    if (isLoading) {
      setDisplay(<Loader />);
    }
    if (fetchedPokemon) {
      setDisplay(
        <PokemonPortrait key={"PokemonSearchPortrait"}>
          <img
            src={fetchedPokemon.sprites.front_default}
            alt={fetchedPokemon.name}
          />
          <Typography
            variant={"h6"}
            className={pokemonPortraitClasses.Pokemon_Name}
          >
            {fetchedPokemon.name}
          </Typography>
          <ButtonGroup fullWidth>
            <Button
              fullWidth
              variant={"contained"}
              color={"primary"}
              onClick={doSelectPokemon}
            >
              Data
            </Button>
            <Button
              fullWidth
              variant={"contained"}
              color={"secondary"}
              onClick={doAddPokemon}
            >
              Add to Lineup
            </Button>
          </ButtonGroup>
        </PokemonPortrait>
      );
    }
    if (pokemon404) {
      setDisplay(<PokemonNotFound pokemonQuery={pokemonQuery} />);
    }
  }, [
    isLoading,
    fetchedPokemon,
    pokemon404,
    pokemonQuery,
    pokemonPortraitClasses,
    doAddPokemon,
    doSelectPokemon,
  ]);

  const closePokemonSearch = () => {
    const e: any = { target: { value: "" } };
    setDisplay(null);
    clearPokemonQuery(e);
  };

  return (
    <div className={pokemonSearchClasses.root}>
      <div className={pokemonSearchClasses.container}>
        {display && !isLoading && (
          <CloseButton onClose={closePokemonSearch} disableContainer />
        )}
        {display}
      </div>
    </div>
  );
};

export default PokemonSearch;
