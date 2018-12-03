import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { getResources, getStatus } from 'redux-resource';
import { 
  readManyPortfolioPortfolioWeights, 
  createWeightPortfolio, 
  updateWeightPortfolio,
  deleteWeightPortfolio,
 } from '../actions/crud_portfolios';

import { fetchTickersIfNeeded } from '../actions/crud_tickers';

import {
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table,
} from 'reactstrap';

import TickerSelector from '../components/TickerSelector';

const WeightPortfolioSchema = Yup.object().shape({
  weight: Yup.number()
    .min(1, 'Too Small!')
    .required('Required'),
});



class WeightPortfolio extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { portfolioId, weightPortfolio, updateWeightPortfolio, deleteWeightPortfolio } = this.props;
    console.log('props formik ', this.props);
    console.log('state ', this.state );
    return (
         <Formik
          initialValues={{
            weight: weightPortfolio.weight || 1,
          }}
          validationSchema={WeightPortfolioSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log("VALUES ", values);
            if(weightPortfolio.weight != values.weight) {
              updateWeightPortfolio(portfolioId, weightPortfolio.id, values.weight);
            }
          }}
        >
        {({ errors, touched }) => (
            <Form className='mb-2'>
              <InputGroup>
                <InputGroupAddon addonType="prepend">{weightPortfolio.symbol}</InputGroupAddon>
                <Field id={`weightPortfolio_${weightPortfolio.id}`} name="weight" className="form-control"  />
                <InputGroupAddon addonType="append">
                    {!errors.weight ? (
                  <Button type="submit" color='secondary' size="sm" >update</Button>
                  ) : null}
                  <Button color='danger' size="sm" onClick={() => deleteWeightPortfolio(portfolioId, weightPortfolio.id)}>delete</Button>
                </InputGroupAddon>
              </InputGroup>
              {errors.weight && touched.weight ? (
                    <div className='text-danger'>{errors.weight}</div>
                  ) : null}
            </Form>
          )}
        </Formik>
      )
  }
}
/*

WeightPortfolio.propTypes = {
  portfolioId: PropTypes.number.isRequired,
  weightPortfolio: PropTypes.Object.required,
  updateWeightPortfolio: PropTypes.function.required,
  deleteWeightPortfolio: PropTypes.function.required,
};

*/

class WeightPortfolioList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      tickerId: null,
      tickerSymbol: null,
      weight: 1
    }
  }
  render() {
    const { portfolioWeightPortfolios, portfolioWeightPortfoliosStatus, tickers } = this.props;
    const { updateWeightPortfolio, deleteWeightPortfolio } = this.props;
    
    const { portfolioId } = this.props;
    const { tickerId, tickerSymbol, weight } = this.state;
    return (
      <div>
          {portfolioWeightPortfoliosStatus.pending && 'Loading ...'}
          {portfolioWeightPortfoliosStatus.failed && (
            <span>
              There was an error loading .{' '}
              <button onClick={this.readManyPortfolioPortfolioWeights}>Try again.</button>
            </span>
          )}
          {portfolioWeightPortfoliosStatus.succeeded && (
            <div>
              {portfolioWeightPortfolios.map(weightPortfolio => (
                <WeightPortfolio key={weightPortfolio.id} portfolioId={portfolioId} weightPortfolio={weightPortfolio} updateWeightPortfolio={updateWeightPortfolio} deleteWeightPortfolio={this.deleteWeightPortfolio}/>
              ))}
            </div>
            
          )}
        <h3>Add new ticker</h3>
        <Form onSubmit={this.addWeightPortfolio}>
          <TickerSelector options={tickers} selectedTicker={tickerSymbol} onChange={this.onTickerChange}/>
          <Input name={"weight"} value={weight} onChange={this.onWeightChange}/>
          <Button color='success' type="submit" >add weight</Button>
        </Form>
        </div>
    );
  }

  componentDidMount() {
    this.fetchPortfolioPortfolioWeights();
    this.props.fetchTickersIfNeeded();
  }

  componentDidUpdate(prevProps) {
    if (this.props.portfolioId != prevProps.portfolioId) {
      this.fetchPortfolioPortfolioWeights();
    }
  }

  componentWillUnmount() {
    if (this.readManyPortfolioPortfolioWeightsXhr) {
      this.readManyPortfolioPortfolioWeightsXhr.abort();
    }
  }

  fetchPortfolioPortfolioWeights = () => {
    const { readManyPortfolioPortfolioWeights, portfolioId } = this.props;

    if (this.readManyPortfolioPortfolioWeightsXhr) {
      this.readManyPortfolioPortfolioWeightsXhr.abort();
    }

    this.readManyPortfolioPortfolioWeightsXhr = readManyPortfolioPortfolioWeights(portfolioId);
  };

  
  addWeightPortfolio = (event) =>{
    event.preventDefault();
    const { portfolioId } = this.props;
    const { tickerId, tickerSymbol, weight } = this.state;
    this.props.createWeightPortfolio(portfolioId, {
      portfolio: portfolioId, 
      ticker: tickerId, 
      weight: weight
    });
    this.setState({tickerId: null, tickerSymbol: null, weight: 1})
  }

  updateWeightPortfolio = (portfolioId, weightPortfolioId, weight) =>{
      this.props.updateWeightPortfolio(portfolioId, weightPortfolioId, weight);
  }

  deleteWeightPortfolio = (portfolioId, weightPortfolioId) =>{
    const confirmedDelete = window.confirm(
      `Are you sure you wish to delete ? This cannot be undone. `
    );
    
    if (confirmedDelete) {
      this.props.deleteWeightPortfolio(portfolioId, weightPortfolioId);
    }
  }

  onTickerChange = (nextTicker) => {
    if (typeof nextTicker == 'object') {
      // if we have an array we take the first
      if (nextTicker[0]){
        nextTicker = nextTicker[0]
      }
    }
    this.setState({
      tickerId: nextTicker['id'],
      tickerSymbol: nextTicker['symbol']
    });
  }

  onWeightChange = event => {
    this.setState({
      weight: event.target.value
    });
  };
}

function mapStateToProps(state, ownProps) {
  const portfolioWeightPortfolios = getResources(state.weightPortfolios, 'portfolioWeights');
  const portfolioWeightPortfoliosStatus = getStatus(
    state,
    'weightPortfolios.requests.getPortfolioWeightPortfolios.status',
    true
  );
  const tickers = getResources(state.tickers, 'allTickers');
  const selectedWeightPortfolio = getResources(state.weightPortfolios, 'selected');

  return {
    portfolioWeightPortfolios,
    portfolioWeightPortfoliosStatus,
    selectedWeightPortfolio,
    tickers,
  };
}

const mapDispatchToProps = {
  readManyPortfolioPortfolioWeights,
  createWeightPortfolio,
  updateWeightPortfolio,
  deleteWeightPortfolio,
  fetchTickersIfNeeded,
};

WeightPortfolioList.propTypes = {
  portfolioId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeightPortfolioList);