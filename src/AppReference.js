import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import { Provider } from "react-redux";
import configureStore from './configureStore';

import Loadable from 'react-loadable';

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const ReferenceLayout = Loadable({
  loader: () => import('./containers/Layout/ReferenceLayout'),
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

/* eslint-disable no-underscore-dangle */
const store = configureStore();
//let store = createStore(dataTradeApp,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
/* eslint-enable */

class AppReference extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path='/' render={routeProps => <ReferenceLayout {...routeProps} isRestricted={false} />} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}


export default AppReference;
