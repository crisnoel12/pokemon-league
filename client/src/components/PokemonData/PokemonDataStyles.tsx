import { Theme, makeStyles } from "@material-ui/core";

const PokemonDataStyles = makeStyles((theme: Theme) => ({
  cardRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "40%"
  },
  listItemRoot: {
    padding: 0
  },
  uppercase: {
    textTransform: "uppercase"
  }
}));

export default PokemonDataStyles;