import { Theme, makeStyles } from "@material-ui/core";

const HeroStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative"
  },
  Pokemon_Hero_Img: {
    width: "100%",
    height: "calc(100vh - 188px)"
  },
  overlay: {
    height: "calc(100vh - 188px)",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  }
}));

export default HeroStyles;