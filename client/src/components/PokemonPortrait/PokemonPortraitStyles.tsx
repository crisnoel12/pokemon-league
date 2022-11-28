import { makeStyles } from "@material-ui/core";

const PokemonPortraitStyles = makeStyles({
  Pokemon_Portrait: {
    position: "relative",
    backgroundColor: "antiquewhite",
    borderRadius: "5px",
    color: "black",
    marginBottom: "16px"
  },
  Pokemon_Lineup_Number: {
    position: "absolute",
    color: "white",
    backgroundColor: "royalblue",
    borderRadius: "100%",
    lineHeight: "24px",
    width: "24px",
    left: "8px",
    top: "8px",
    fontSize: ".7em",
    fontWeight: "bold"
  },
  Pokemon_Lineup_Remove: {
    position: "absolute",
    color: "black",
    borderRadius: "100%",
    right: "15px",
    top: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  Pokemon_Name: {
    margin: "0",
    marginTop: "-8px",
    paddingBottom: "12px",
    textTransform: 'capitalize'
  },
});

export default PokemonPortraitStyles; 