import { combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';
import templates from './templates';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';


const portfolios = resourceReducer('portfolios');
const weightPortfolios = resourceReducer('weightPortfolios');

const tickers = resourceReducer('tickers');
const ticks = resourceReducer('ticks');


const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  portfolios,
  weightPortfolios,
  templates,
  tickers, 
  ticks,
})

export default rootReducer ;


