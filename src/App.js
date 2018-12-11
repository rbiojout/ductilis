import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

import Loadable from 'react-loadable';

import './App.scss';

import { Provider } from "react-redux";
//import { createStore, applyMiddleware, compose } from "redux";
//import thunkMiddleware from 'redux-thunk';
//import rootReducer from "./reducers";
import configureStore from './configureStore';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/Layout/DefaultLayout'),
  loading
});

// Pages
const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500/Page500'),
  loading
});


// import { renderRoutes } from 'react-router-config';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
/*let store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));
/* eslint-enable */

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            {/* <Route path="/h" name="Home" component={DefaultLayout} /> */}
            <PrivateRoute path="/protected" component={User} />
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path='/' render={routeProps => <DefaultLayout {...routeProps} isRestricted={true} />} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}


export default App;
