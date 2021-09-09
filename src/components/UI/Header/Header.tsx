import HeaderStyles from './HeaderStyles';

const Header = () => {
    const classes = HeaderStyles();
    return (
        <div>
            <header className={classes.App_Header}>
                <h1 className={classes.App_Title}>Pokemon League</h1>
            </header>
        </div>
    );
};

export default Header;