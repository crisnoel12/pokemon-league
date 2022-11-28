import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { RouteComponentProps } from "react-router-dom";

import ProfileStyles from "./ProfileStyles";
import {
  AUTHUSER,
  POKEMON,
  POKEAPI_INITIAL_STATE,
  USER_PROFILE_INITIAL_STATE,
  USER,
} from "../../types";
import * as actions from "../../store/actions/index";
import PageNotFound from "../../components/UI/PageNotFound/PageNotFound";
import PokemonSearch from "../../components/PokemonSearch/PokemonSearch";
import PokemonData from "../../components/PokemonData/PokemonData";
import PokemonLineup from "../../components/PokemonLineup/PokemonLineup";
import Loader from "../../components/UI/Loader/Loader";
import UserCard from "../../components/UserCard/UserCard";

interface PROPS extends RouteComponentProps<{ [key: string]: any }> {
  doFetchPokemonHandler: (query: string) => any;
  doSelectPokemonHandler: (pokemon: POKEMON) => any;
  doDeselectPokemonHandler: () => any;
  doUpdatePokemonQueryHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  doLoadProfileHandler: (authUser: AUTHUSER, userId: string) => void;
  doAddPokemonToLineupHandler: (
    authUser: AUTHUSER,
    pokemon: POKEMON,
    pokemonLineup: POKEMON[]
  ) => void;
  doRemovePokemonFromLineupHandler: (
    authUser: AUTHUSER,
    pokemon: POKEMON,
    pokemonLineup: POKEMON[]
  ) => void;
  doUpdateProfileHandler: (
    authUser: AUTHUSER,
    user: USER
  ) => void,
  pokeAPI: POKEAPI_INITIAL_STATE;
  userProfile: USER_PROFILE_INITIAL_STATE;
  authUser: AUTHUSER;
  classes: { [key: string]: any };
}

const Profile = (props: PROPS) => {
  const {
    authUser,
    classes,
    doAddPokemonToLineupHandler,
    doFetchPokemonHandler,
    doRemovePokemonFromLineupHandler,
    doSelectPokemonHandler,
    doDeselectPokemonHandler,
    doUpdatePokemonQueryHandler,
    doLoadProfileHandler,
    doUpdateProfileHandler,
    userProfile: { user, isProfile404, isAuthProfile },
    pokeAPI: {
      selectedPokemon,
      isLoading,
      fetchedPokemon,
      pokemon404,
      pokemonQuery,
    },
    history,
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    if (authUser) {
      doLoadProfileHandler(authUser, id);
    } else {
      history.push("/");
    }
  }, [authUser, id]);

  const fetchPokemonHandler = (event: any) => {
    event.preventDefault();

    if (pokemonQuery !== "") {
      doFetchPokemonHandler(pokemonQuery);
    } else {
      alert("Please type in a pokemon name.");
    }
  };

  const addPokemonToLineupHandler = () => {
    if (user && fetchedPokemon) {
      const { pokemonLineup } = user;

      const checkForDuplicate = pokemonLineup.find((p: POKEMON) => p.id === fetchedPokemon.id);
      if (checkForDuplicate !== undefined) {
        alert(fetchedPokemon.name + " is already in the lineup.");
      } else if (fetchedPokemon && pokemonLineup.length < 6) {
        doAddPokemonToLineupHandler(authUser, fetchedPokemon, pokemonLineup);
      } else {
        alert("Pokemon lineup spots are filled.");
      }
    }
  };

  return (
    <>
      {isProfile404 ? (
        <PageNotFound />
      ) : user ? (
        <div style={{ padding: "30px" }}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <UserCard 
                user={user} 
                isAuthProfile={isAuthProfile} 
                doUpdateProfile={(user: USER) => doUpdateProfileHandler(authUser, user)}
              />
            </Grid>
            {isAuthProfile && 
            <Grid item xs={6}>
              <form
                className={classes.Pokemon_Search_Form}
                onSubmit={fetchPokemonHandler}
              >
                <input
                  className={classes.Pokemon_Searchbox}
                  type="text"
                  name="query"
                  placeholder="Search Pokemon (e.g. Pikachu and press enter)"
                  value={pokemonQuery}
                  onChange={doUpdatePokemonQueryHandler}
                />
              </form>
              <PokemonSearch
                isLoading={isLoading}
                fetchedPokemon={fetchedPokemon}
                pokemon404={pokemon404}
                pokemonQuery={pokemonQuery}
                clearPokemonQuery={doUpdatePokemonQueryHandler}
                doSelectPokemon={() =>
                  fetchedPokemon && doSelectPokemonHandler(fetchedPokemon)
                }
                doAddPokemon={addPokemonToLineupHandler}
              />
            </Grid>}
            <Grid item xs={6}>
              <Typography
                variant={"h4"}
                className={classes.Pokemon_Lineup_Heading}
              >
                Pokemon Lineup
              </Typography>
              <PokemonLineup
                isAuthProfile={isAuthProfile}
                pokemonLineup={user.pokemonLineup}
                doRemovePokemon={(pokemon: POKEMON) =>
                  doRemovePokemonFromLineupHandler(
                    authUser,
                    pokemon,
                    user.pokemonLineup
								)}
              />
            </Grid>
          </Grid>
          <PokemonData
            selectedPokemon={selectedPokemon}
            deselectPokemon={doDeselectPokemonHandler}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    pokeAPI: {
      fetchedPokemon: state.pokeAPI.fetchedPokemon,
      pokemon404: state.pokeAPI.pokemon404,
      selectedPokemon: state.pokeAPI.selectedPokemon,
      isLoading: state.pokeAPI.isLoading,
      pokemonQuery: state.pokeAPI.pokemonQuery,
    },
    userProfile: {
      user: state.userProfile.user,
      isAuthProfile: state.userProfile.isAuthProfile,
      isProfile404: state.userProfile.isProfile404,
      isLoading: state.userProfile.isLoading,
      error: state.userProfile.error,
    },
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    doFetchPokemonHandler: (query: string) => dispatch(actions.fetchPokemon(query)),
    doSelectPokemonHandler: (pokemon: POKEMON) => dispatch(actions.selectPokemon(pokemon)),
    doDeselectPokemonHandler: () => dispatch(actions.deselectPokemon()),
    doUpdatePokemonQueryHandler: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(actions.updatePokemonQuery(e)),

    doLoadProfileHandler: (authUser: AUTHUSER, userId: string) => dispatch(actions.loadProfile(authUser, userId)),
    doAddPokemonToLineupHandler: (
      authUser: AUTHUSER,
      pokemon: POKEMON,
      pokemonLineup: POKEMON[]
    ) => dispatch(actions.addPokemonToLineup(authUser, pokemon, pokemonLineup)),
    doRemovePokemonFromLineupHandler: (
      authUser: AUTHUSER,
      pokemon: POKEMON,
      pokemonLineup: POKEMON[]
    ) => dispatch(actions.removePokemonFromLineup(authUser, pokemon, pokemonLineup)),
    doUpdateProfileHandler: (
      authUser: AUTHUSER,
      user: USER
    ) => dispatch(actions.updateProfile(authUser, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(Profile));
