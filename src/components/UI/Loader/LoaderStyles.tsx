import { makeStyles } from "@material-ui/core";

const LoaderStyles = makeStyles({
  loaderText: {
    letterSpacing: ".5em",
    fontSize: ".6em",
    transform: "translate(-50%, -50%)",
    animation: "pulse .9s ease infinite"
  },

  "@keyframes pulse": {
    "50%": {
        opacity: 0
    }
  }
})

export default LoaderStyles;