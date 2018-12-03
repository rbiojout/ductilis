import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

import PortfolioList from '../../containers/PortfolioList';

class Portfolios extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Portfolios
          </CardHeader>
          <CardBody>
            <Col >
            <PortfolioList/>
            </Col>
          </CardBody>
        </Card>
        <Row>

          
        </Row>
      </div>
    )
  }

}


export default Portfolios;
