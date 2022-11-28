import { ButtonGroup, Button } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import HeaderStyles from './HeaderStyles';
import { useContext, useState } from 'react';
import AuthUserContext from '../../../context/AuthUserContext';
import Login from '../../Login/Login';
import SignUp from '../../SignUp/SignUp';
import { ApiManager } from '../../../helpers/ApiManager';

const Header = ({ history }: RouteComponentProps) => {
    const classes = HeaderStyles();
    const [form, setForm] = useState<any>(null);
    const { authUser, setAuthUser } = useContext(AuthUserContext);

    // functions
    const closeForm = () => setForm(null);

    const logout = () => {
        ApiManager.logout();
        setAuthUser(null);
        history.push("/");
    };
    return (
        <div>
            <header className={classes.App_Header}>
                <h1 className={classes.App_Title}>Pokemon League</h1>
            </header>
            {
                authUser ? (
                    <ButtonGroup fullWidth>
                        <ButtonGroup>
                            <Button variant={"contained"} onClick={() => history.push(`/profile/${authUser}`)}>Home</Button>
                            <Button variant={"contained"} onClick={() => history.push("/trainers")}>Trainers</Button>
                        </ButtonGroup>
                        <Button variant={"contained"} onClick={logout}>Logout</Button>
                    </ButtonGroup>
                ) : (
                    <ButtonGroup fullWidth>
                        <Button variant={"contained"} onClick={() => setForm(<SignUp close={closeForm} />)}>Sign Up</Button>
                        <Button variant={"contained"} onClick={() => setForm(<Login close={closeForm} />)}>Login</Button>
                    </ButtonGroup>
                )
            }
            {form}
        </div>
    );
};

export default withRouter(Header);