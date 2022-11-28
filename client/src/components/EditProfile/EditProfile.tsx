import { Button, Grid, makeStyles, Modal, Paper, TextField, Theme, Typography } from '@material-ui/core'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import AuthUserContext from '../../context/AuthUserContext';
import { ApiManager } from '../../helpers/ApiManager';
import { USER } from '../../types';
import CloseButton from '../UI/CloseButton/CloseButton';
import {AUTHUSERCONTEXT} from '../../types/index';
import SnackbarContext from '../../context/SnackbarContext';
import { useSelector } from 'react-redux';

interface PROPS {
  doUpdateProfile: (user: USER) => void,
  close: () => void
}

const initUserData: Partial<USER> = {
  username: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
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

const EditProfile = ({ close, doUpdateProfile }: PROPS) => {
  const classes = useStyles();

  const user = useSelector((state: any) => state.userProfile.user);
  const { authUser } = useContext(AuthUserContext) as AUTHUSERCONTEXT;
  const { setSnackbar } = useContext(SnackbarContext);

  // state
  const [userData, setUserData] = useState<Partial<USER>>(initUserData);
  const [errors, setErrors] = useState<Partial<USER>>(initUserData);

  // hooks
  useEffect(() => {
    const fillInUserData = {
      ...userData,
      ...user
    }
    setUserData(fillInUserData);
  },[user]);

  // functions
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const isSubmitDisabled = () => {
    switch (true) {
      case user.username !== userData.username:
        return false;
      case user.email !== userData.email:
        return false;
      case user.first_name !== userData.first_name:
        return false;
      case user.middle_name !== userData.middle_name:
        return false;
      case user.last_name !== userData.last_name:
        return false;
      case userData.password !== "" && !passwordsDoNotMatch:
        return false;
      default:
        return true;
    }
  }

  const passwordsDoNotMatch = userData.confirm_password !== userData.password;

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await ApiManager.updateProfile(authUser, userData);
      setSnackbar({message: response.data.message})
      doUpdateProfile(response.data);
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
            <Typography variant={"h3"}>Edit Profile</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              variant={"outlined"} 
              type="text" 
              placeholder="Username"
              value={userData.username}
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
              value={userData.email}
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
              value={userData.first_name}
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
              value={userData.middle_name}
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
              value={userData.last_name}
              fullWidth
              name="last_name"
              onChange={onChangeHandler} 
              error={errors.last_name !== ""}
              helperText={errors.last_name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant={"outlined"} 
              type="password"  
              placeholder="Password" 
              value={userData.password}
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
              value={userData.confirm_password}
              fullWidth 
              name="confirm_password"
              onChange={onChangeHandler}
              error={errors.confirm_password !== "" || passwordsDoNotMatch}
              helperText={errors.confirm_password ? errors.confirm_password : passwordsDoNotMatch ? 'Passwords do not match' : null}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              type={"submit"}
              color={"primary"} 
              fullWidth 
              variant={"contained"} 
              onClick={onSubmitHandler}
              disabled={isSubmitDisabled()}
            >
              Update
            </Button>
          </Grid>
          <CloseButton onClose={close} />
        </Grid>
      </form>
    </Modal>
  )
}

export default EditProfile;
