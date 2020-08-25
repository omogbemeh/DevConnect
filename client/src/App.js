import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './componenets/layout/Navbar';
import Landing from './componenets/layout/Landing';
import Register from './componenets/auth/Register';
import Login from './componenets/auth/Login';
import Alert from './componenets/auth/Alert';
import CreateProfile from './componenets/profile-forms/CreateProfile';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './componenets/routing/PrivateRoute';
import Dashboard from './componenets/dashboard/Dashboard'



if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
    useEffect(() => {
      store.dispatch(loadUser());
    }, [])

    return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={ Landing } />
          <section className='container'>
          <Alert />
          <Switch>
              <Route exact path='/register' component={ Register } />
              <Route exact path='/login' component={ Login } />
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
      
)};

export default App;
