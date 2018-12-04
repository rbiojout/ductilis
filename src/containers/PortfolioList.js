import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import * as Yup from 'yup';
import { 
  readManyUserPortfolios, 
  createPortfolio, 
  selectPortfolio, 
  updatePortfolio,
  deletePortfolio 
} from '../actions/crud_portfolios';

import { Formik, Form, Field } from 'formik';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';

import WeightPortfoliosList from './WeightPortfoliosList';

const PortfolioSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Small!')
    .max(30, 'Too Big!')
    .required('Required'),
});

class Portfolio extends Component {
  render() {
    const { portfolio, selected } = this.props;
    const portfolioId = portfolio.id;

    const { selectPortfolio, updatePortfolio, deletePortfolio} = this.props;
    console.log("props in Portfolio ", this.props);
    return (
      <Formik
          initialValues={{
            name: portfolio.name || '',
          }}
          validationSchema={PortfolioSchema}
          validateOnChange
          onSubmit={(values, actions) => {
            // same shape as initial values
            console.log("VALUES ", values);
            if(portfolio.name != values.name) {
              updatePortfolio(portfolioId, {id: portfolioId, name: values.name});
            }
          }}
        >
        {({ errors, touched, handleSubmit }) => (
            <form key={`portfolio_${portfolioId}`} className='mb-2' onSubmit={handleSubmit}>
              <InputGroup>
                <Field name="name" className="form-control"  />
                <InputGroupAddon addonType="append">
                  {!errors.name ? (
                    <Button type="submit" color='secondary' size="sm" >update</Button>
                  ) : null}
                  {(portfolio.id==selected) ? (
                    <Button type="button" color='success' size="sm" >Selected</Button>
                  ) : <Button type="button" color='secondary' size="sm" onClick={() => selectPortfolio(portfolioId)}>select</Button>
                  }
              
                  <Button type="button" color='danger' size="sm" onClick={() => deletePortfolio(portfolioId)}>delete</Button>
                </InputGroupAddon>
              </InputGroup>
              {errors.name && touched.name ? (
                    <div className='text-danger'>{errors.name}</div>
                  ) : null}
            </form>
          )}
        </Formik>
      )
  }

}

export {Portfolio};

class PortfolioList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioName: '',
    }
  }
  render() {
    const { userPortfolios, userPortfoliosStatus, selectedPortfolio } = this.props;
    const { selectPortfolio, updatePortfolio, deletePortfolio} = this.props;
    
    let selected = null;
    if (selectedPortfolio[0]) {
      selected = selectedPortfolio[0].id;
    }
    return (
      <Card>
        <CardHeader>
          Portfolios
        </CardHeader>
        <CardBody>
            <Row>
              <Col sm={5}>
                <h3>List of Porfolios</h3>
                  {userPortfoliosStatus.pending && 'Loading ...'}
                  {userPortfoliosStatus.failed && (
                    <span>
                      There was an error loading .{' '}
                      <button onClick={this.fetchUsersGists}>Try again.</button>
                    </span>
                  )}
                  {userPortfoliosStatus.succeeded && 
                      this.props.userPortfolios.map(portfolio => (
                        <Portfolio key={`portfolio_${portfolio.id}`} portfolio={portfolio} selected={selected} 
                        selectPortfolio={selectPortfolio}
                        updatePortfolio={updatePortfolio} 
                        deletePortfolio={this.deletePortfolio}/>
                      ))
                  }
              </Col>
              <Col sm={7}>
                <h4>Tickers</h4>
                { (selected !=null) &&
                <WeightPortfoliosList portfolioId={selected}/>
                }
              </Col>
            </Row>
        <h3>Add new portfolio</h3>
        <Form onSubmit={this.addPortfolio}>
          <Input className="form-control" type="text" value={this.state.portfolioName} onChange={this.onPortfolioNameChange} />
          <input type="submit" value="Submit" />
        </Form>
        
        </CardBody>
      </Card>
    );
  }

  componentDidMount() {
    this.fetchUserPortfolios();
  }

  componentWillUnmount() {
    if (this.readManyUserPortfoliosXhr) {
      this.readManyUserPortfoliosXhr.abort();
    }
  }

  fetchUserPortfolios = () => {
    const { readManyUserPortfolios } = this.props;

    if (this.readManyUserPortfoliosXhr) {
      this.readManyUserPortfoliosXhr.abort();
    }

    this.readManyUserPortfoliosXhr = readManyUserPortfolios();
  };

  selectPortfolio = (portfolioId) => {
    //this.props.selectPortfolio(0)
  }

  addPortfolio = (event) =>{
    event.preventDefault();
    this.props.createPortfolio({name: this.state.portfolioName});
    this.setState({portfolioName:''})
    //this.props.readManyUserPortfolios();
  }

  deletePortfolio = (portfolioId) =>{
    const confirmedDelete = window.confirm(
      `Are you sure you wish to delete ? This cannot be undone. `
    );
    
    if (confirmedDelete) {
      this.props.deletePortfolio(portfolioId);
    }
  }

  onPortfolioNameChange = event => {
    this.setState({
      portfolioName: event.target.value
    });
  };
}

function mapStateToProps(state) {
  const userPortfolios = getResources(state.portfolios, 'userPortfolios');
  const userPortfoliosStatus = getStatus(
    state,
    'portfolios.requests.getUserPortfolios.status',
    true
  );
  const selectedPortfolio = getResources(state.portfolios, 'selected');


  return {
    userPortfolios,
    userPortfoliosStatus,
    selectedPortfolio,
  };
}

const mapDispatchToProps = {
  readManyUserPortfolios,
  createPortfolio,
  selectPortfolio,
  updatePortfolio,
  deletePortfolio,
};


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);