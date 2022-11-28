import { IconButton, Theme, makeStyles, Tooltip } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

interface PROPS {
  onClose: () => void,
  title?: string,
  disableContainer?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
    close: {
      position: "absolute",
      color: "black",
      borderRadius: "100%",
      right: theme.spacing(1),
      top: theme.spacing(1),
      fontWeight: "bold",
      cursor: "pointer",
      zIndex: 1000
    }
}))

export default function CloseButton({ onClose, disableContainer, title }: PROPS) {
  const classes = useStyles();
  return (
    <Tooltip title={title ? title : ""} placement={"top"} arrow>
      {
        !disableContainer ? (
          <IconButton className={classes.close} onClick={onClose}>
            <HighlightOffIcon />
          </IconButton>
        ) : (
          <HighlightOffIcon className={classes.close} onClick={onClose} />
        )
      }
    </Tooltip>
  )
}
