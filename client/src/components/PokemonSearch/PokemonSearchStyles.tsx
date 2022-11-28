import { Theme, makeStyles } from "@material-ui/core";

const PokemonSearchStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative"
  },
  container: {
    position: "absolute", 
    zIndex: 1, 
    width: "100%"
  }
}));

export default PokemonSearchStyles;