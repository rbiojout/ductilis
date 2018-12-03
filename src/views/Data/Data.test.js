import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../configureStore';

import { Provider } from "react-redux";
import Data from './Data';


const store = configureStore();


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Data /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});