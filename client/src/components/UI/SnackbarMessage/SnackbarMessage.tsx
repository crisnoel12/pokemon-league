import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface PROPS {
  snackbar: {
    severity: string,
    message: string
  },
  onClose: () => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarMessage = ({ snackbar, onClose }: PROPS) => {
  const classes = useStyles(); 

  return (
    <div className={classes.root}>
      <Snackbar 
        open
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000} 
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackbarMessage;