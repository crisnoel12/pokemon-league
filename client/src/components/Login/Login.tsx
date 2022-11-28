import { ChangeEvent, useState, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Grid, Modal, Paper, TextField, Typography, makeStyles } from '@material-ui/core';

import AuthUserContext from '../../context/AuthUserContext';
import CloseButton from '../UI/CloseButton/CloseButton';
import { ApiManager } from '../../helpers/ApiManager';
import { AUTHUSERCONTEXT } from '../../types';

interface PROPS extends RouteComponentProps {
  close: () => void
}

interface LOGIN_DATA {
  email: string,
  password: string
}

const initialLoginData: LOGIN_DATA = {
  email: '',
  password: ''
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(3),
    width: '50%',
    maxWidth: '50%'
  }
}));

const Login = ({ close, history }: PROPS) => {
  // Variables
  const classes = useStyles();
  const { setAuthUser } = useContext(AuthUserContext) as AUTHUSERCONTEXT;

  // State
  const [loginData, setLoginData] = useState<LOGIN_DATA>(initialLoginData);
  const [errors, setErrors] = useState<LOGIN_DATA>(initialLoginData);

  // Functions
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await ApiManager.login(loginData);
      close();
      setAuthUser(response.data.user);
      history.push(`/profile/${response.data.user}`);
    } catch(error: any) {
      if(error.response.data.errors) {
        setErrors({...errors, ...error.response.data.errors});
      }
    }
  }

  return (
    <Modal
      open
      onClose={close}
    >
      <form onSubmit={onSubmitHandler}>
        <Grid container component={Paper} spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant={"h3"}>Login</Typography>
          </Grid>
            <Grid item xs={12}>
              <TextField
                  variant={"outlined"} 
                  type="email" 
                  placeholder="Email" 
                  fullWidth 
                  name="email"
                  onChange={onChangeHandler}
                  error={errors.email !== ""}
                  helperText={errors.email}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant={"outlined"} 
                type="password"  
                placeholder="Password" 
                fullWidth 
                name="password"
                onChange={onChangeHandler}
                error={errors.password !== ""}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type={"submit"} color={"primary"} fullWidth variant={"contained"} onClick={onSubmitHandler}>Submit</Button>
            </Grid>
          <CloseButton onClose={close} />
        </Grid>
      </form>
    </Modal>
  )
}

export default withRouter(Login);
