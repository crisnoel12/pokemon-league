import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import Header from './components/UI/Header/Header';
import Hero from './components/Hero/Hero';
import Profile from './containers/Profile/Profile';
import PageNotFound from './components/UI/PageNotFound/PageNotFound';
import axios from 'axios';
import AuthUserContext from './context/AuthUserContext';
import SnackbarContext from './context/SnackbarContext';
import Loader from './components/UI/Loader/Loader';
import Trainers from './components/Trainers/Trainers';
import { AUTHUSER } from './types';
import { ApiManager } from './helpers/ApiManager';
import SnackbarMessage from './components/UI/SnackbarMessage/SnackbarMessage';

const useStyles = makeStyles({
  App: {
    textAlign: 'center',
    height: '100%'
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

const App = () => {
  // variables
  const classes = useStyles();

  // state
  const [authUser, setAuthUser] = useState<AUTHUSER>(null);
  const [snackbar, setSnackbar] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await ApiManager.getCSRFToken();
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
      axios.defaults.headers.patch['X-CSRF-Token'] = data.csrfToken;
    };
    

    const isLoggedIn = async () => {
      try {
        const response = await ApiManager.checkIsLoggedIn();
        setAuthUser(response.data.user);
        setIsLoading(false);
      } catch (err: any) {
          const { response, response: { data, data: { error }} }: any = err;
          console.error(error);
          if (error && error.errors && error.errors.TokenExpiredError) {
            alert("Token expired. Please login again");
            return;
          }
          if (response.status === 500) {
            setSnackbar({
              severity: 'error',
              message: "Internal server error"
            });
          }
          setIsLoading(false);  
      }
    }
    
    getCsrfToken();
    isLoggedIn();
  }, []);

  return (
    <div className={classes.App}>
      { isLoading ? (
        <Loader />
      ) : (
        <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
          <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
            <Header />
            <Switch>
              <Route path="/profile/:id" render={(props) => <Profile authUser={authUser} {...props} />}/>
              <Route path="/trainers" render={(props) => <Trainers authUser={authUser} {...props} />}/>
              <Route path="/" exact component={Hero}/>  
              <Route path="*" component={PageNotFound}/>
            </Switch>
          </AuthUserContext.Provider>
          {snackbar && (
            <SnackbarMessage 
              snackbar={snackbar} 
              onClose={() => setSnackbar(null)} 
            />
          )}
        </SnackbarContext.Provider>
      )}
    </div>
  );
}

export default App;
