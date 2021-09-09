import { Theme, makeStyles } from "@material-ui/core";

const HeroStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative"
  },
  Pokemon_Hero_Img: {
    width: "100%",
    height: "calc(100vh - 156px)"
  },
  overlay: {
    height: "calc(100vh - 156px)",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  Hero_Btn: {
    fontWeight: "bold",
    padding: theme.spacing(1),
    background: "yellowgreen",
    color: "black",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    boxSizing: "border-box",
    "&:visited": {
      color: "black"
    },
    [theme.breakpoints.up('xs')]: {
      top: "0",
      left: "0",
      bottom: "unset",
      width: "50%"
    }
  }
}));

export default HeroStyles;