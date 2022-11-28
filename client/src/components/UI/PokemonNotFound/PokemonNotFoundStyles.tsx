import { makeStyles, Theme } from "@material-ui/core";

const PokemonNotFoundStyles = makeStyles((theme: Theme) => ({
  Pokemon_404_alert_msg: {
    borderBottomLeftRadius: 0,
    WebkitBorderBottomRightRadius: 0
  },

  Pokemon_404_img: {
    backgroundImage: "url(https://media.giphy.com/media/u7nXiwsXFpv8I/giphy.gif)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "352px",
    backgroundRepeat: "no-repeat",
  }
}));
export default PokemonNotFoundStyles;