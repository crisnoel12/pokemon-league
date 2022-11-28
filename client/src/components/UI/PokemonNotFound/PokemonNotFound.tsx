import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { POKEAPI_INITIAL_STATE } from "../../../types";
import PokemonNotFoundStyles from "./PokemonNotFoundStyles";

interface PROPS extends Partial<POKEAPI_INITIAL_STATE> {}

const PokemonNotFound = ({ pokemonQuery }: PROPS) => {
  const classes = PokemonNotFoundStyles();
  return (
    <React.Fragment>
      <Alert severity="error" className={classes.Pokemon_404_alert_msg}>
        <Typography>
          Sorry, the pokemon <strong>`{pokemonQuery}`</strong> could not be
          found.
        </Typography>
      </Alert>
      <div className={classes.Pokemon_404_img}></div>
    </React.Fragment>
  );
};

export default PokemonNotFound;
