import { createStyles } from "@material-ui/styles";

const ProfileStyles = createStyles({
  Pokemon_Search_Form: {
    marginBottom: "28px"
  },
  Pokemon_Searchbox: {
      background: "transparent",
      outline: "none",
      color: "white",
      border: "0",
      padding: "5px 5px 8px 5px",
      borderBottom: "3px solid red",
      width: "100%",
      letterSpacing: ".1em",
      boxSizing: "border-box"
  },
  Pokemon_Lineup_Heading: {
    marginBottom: "32px",
    position: "relative",
    fontFamily: "'Do Hyeon', sans-serif",
    letterSpacing: ".1em",
    textAlign: "left",
    '&::after': {
      content: '""',
      position: "absolute",
      bottom: "-23px",
      left: "0",
      right: "0",
      height: "0.5em",
      width: "65px",
      borderTop: "5px solid red",
      zIindex: "-1",
    }
  }
});

export default ProfileStyles; 