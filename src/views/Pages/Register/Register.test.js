import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Register from './Register';
import configureStore from '../../../configureStore';

const store = configureStore();

// we need a provider and a router
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
  <MemoryRouter initialEntries={["/register"]}>
    <Register />
  </MemoryRouter></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
