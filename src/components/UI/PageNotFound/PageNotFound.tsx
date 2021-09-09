import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    Not_Found_Msg: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}));

const PageNotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.Not_Found_Msg}>
            <h1>404, the page you were looking cannot be found.</h1>
        </div>
    );
};

export default PageNotFound;