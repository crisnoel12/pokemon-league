import LoaderStyles from "./LoaderStyles";

const Loader = () => {
    const classes = LoaderStyles();
    return (
        <div>
            <span className={classes.loaderText}>PLEASE WAIT</span>
        </div>
    );
};

export default Loader;