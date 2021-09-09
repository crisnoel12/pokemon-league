import { makeStyles, Theme } from "@material-ui/core";

const HeaderStyles = makeStyles((theme: Theme) => ({
  App_Header: {
    backgroundColor: "#FF1C1C",
    height: "100px",
    padding: "20px",
    color: "white",
    position: "relative",
    borderBottom: "12px solid black",
    "&:after": {
      content: '""',
      position: "absolute",
      boxSizing: "border-box",
      background: "white",
      border: "10px solid black",
      boxShadow: "inset 0 0 0 12px white, inset 0 0 0 16px black",
      borderRadius: "50%",
      height: "80px",
      width: "80px",
      left: "50%",
      bottom: "-48px",
      transform: "translateX(-50%)",
      zIndex: 100
    }
  },
  App_Title: {
    fontSize: "2.5em",
    fontFamily: '"Do Hyeon", sans-serif',
    letterSpacing: ".1em",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    margin: 0
  }
}))

export default HeaderStyles;