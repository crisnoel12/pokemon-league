import { ChangeEvent, useContext, useState } from 'react';
import { Button, Grid, FormLabel, FormControlLabel, Modal, Paper, Radio, TextField, Typography, Theme, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseButton from '../UI/CloseButton/CloseButton';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthUserContext from '../../context/AuthUserContext';
import { USER } from '../../types';
import { ApiManager } from '../../helpers/ApiManager';
import { AUTHUSERCONTEXT } from '../../types/index';

interface PROPS extends RouteComponentProps {
  close: () => void
}

interface SIGNUP_DATA extends Partial<USER> {
  confirm_password: string
}

const initialSignUpData: SIGNUP_DATA = {
  username: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  birthdate: '',
  gender: '',
  password: '',
  confirm_password: ''
}

const useStyles = makeStyles((theme: Theme) => ({
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

const SignUp = ({ close, history }: PROPS ) => {
  // vairables
  const classes = useStyles();
  const { setAuthUser } = useContext(AuthUserContext) as AUTHUSERCONTEXT;

  // state
  const [signUpData, setSignUpData] = useState<SIGNUP_DATA>(initialSignUpData);
  const [errors, setErrors] = useState<SIGNUP_DATA>(initialSignUpData);
  
  // functions
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })
  }

  const isSubmitDisabled = () => {
    switch (true) {
      case signUpData.username === "":
        return true;
      case signUpData.email === "":
        return true;
      case signUpData.first_name === "":
        return true;
      case signUpData.last_name === "":
        return true;
      case signUpData.birthdate === "":
        return true;
      case signUpData.gender === "":
        return true;
      case signUpData.password === "":
        return true;
      case signUpData.confirm_password === "":
        return true;
      case passwordsDoNotMatch:
        return true;
      default:
        return false;
    }
  }

  const passwordsDoNotMatch = signUpData.confirm_password !== signUpData.password;

  const onSubmitHandler = async () => {
    try {
      const response: any = await ApiManager.signUp(signUpData);
      close();
      setAuthUser(response.data.user);
      history.push(`/profile/${response.data.user}`);
    } catch(error: any) {
      console.error(error);
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
            <Typography variant={"h3"}>Sign Up</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              variant={"outlined"} 
              type="text" 
              placeholder="Username"
              fullWidth
              name="username"
              onChange={onChangeHandler} 
              error={errors.username !== ""}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={4}>
            <TextField
              variant={"outlined"} 
              type="text" 
              placeholder="First Name" 
              fullWidth 
              name="first_name"
              onChange={onChangeHandler}
              error={errors.first_name !== ""}
              helperText={errors.first_name}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant={"outlined"} 
              type="text" 
              placeholder="Middle Name" 
              fullWidth 
              name="middle_name"
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant={"outlined"} 
              type="text" 
              placeholder="Last Name" 
              fullWidth
              name="last_name"
              onChange={onChangeHandler} 
              error={errors.last_name !== ""}
              helperText={errors.last_name}
            />
          </Grid>
          <Grid item xs={8}>
            <FormLabel>Birthdate</FormLabel>
            <TextField
              variant={"outlined"} 
              id="birthdate" 
              type="date" 
              fullWidth 
              name="birthdate"
              onChange={onChangeHandler}
              error={errors.birthdate !== ""}
              helperText={errors.birthdate}
            />
          </Grid>
          <Grid item xs={4}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        id="m"
                        value="m" 
                        className="radio"
                        name="gender"
                        checked={signUpData.gender === 'm'}
                        onChange={onChangeHandler}
                      />
                    }
                    label="Male"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                      value="end"
                      control={
                        <Radio
                          id="f"
                          value="f" 
                          className="radio" 
                          name="gender"
                          checked={signUpData.gender === 'f'}
                          onChange={onChangeHandler}
                        />
                      }
                      label="Female"
                      labelPlacement="end"
                    />
                </Grid>
                <Typography className={"MuiFormHelperText-root MuiFormHelperText-contained Mui-error"} variant={"caption"}>{errors.gender}</Typography>
              </Grid>
            </RadioGroup>
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
            <TextField 
              variant={"outlined"}
              type="password"  
              placeholder="Confirm Password" 
              fullWidth 
              name="confirm_password"
              onChange={onChangeHandler}
              error={errors.confirm_password !== "" || passwordsDoNotMatch}
              helperText={errors.confirm_password ? errors.confirm_password : passwordsDoNotMatch ? 'Passwords do not match' : null}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              color={"primary"} 
              fullWidth 
              variant={"contained"} 
              onClick={onSubmitHandler}
              disabled={isSubmitDisabled()}
            >
              Submit
            </Button>
          </Grid>
          <CloseButton onClose={close} />
        </Grid>
      </form>
    </Modal>
  )
}

export default withRouter(SignUp);
