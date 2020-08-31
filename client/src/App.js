import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './componenets/layout/Navbar';
import Landing from './componenets/layout/Landing';
import Register from './componenets/auth/Register';
import Login from './componenets/auth/Login';
import Alert from './componenets/auth/Alert';
import CreateProfile from './componenets/profile-forms/CreateProfile';
import EditProfile from './componenets/profile-forms/EditProfile';
import AddExpereince from './componenets/profile-forms/AddExperience';
import AddEducation from './componenets/profile-forms/AddEducation';


import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './componenets/routing/PrivateRoute';
import Dashboard from './componenets/dashboard/Dashboard'
import Profiles from './componenets/Profiles/Profiles'


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
              <Route exact path='/profiles' component={ Profiles }/>
              <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
              <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
              <PrivateRoute exact path='/add-experience' component={ AddExpereince } />
              <PrivateRoute exact path='/add-education' component={ AddEducation } />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
      
)};

export default App;
