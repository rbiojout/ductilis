import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { userActions } from '../../../actions/user.actions';

class LoginPage extends React.Component {
  constructor(props) {
      super(props);

      // reset login status
      this.props.dispatch(userActions.logout());

      this.state = {
          username: '',
          password: '',
          submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();

      this.setState({ submitted: true });
      const { username, password } = this.state;
      const { dispatch } = this.props;
      if (username && password) {
          dispatch(userActions.login(username, password));
      }
  }

  render() {
      const { loggingIn } = this.props;
      const { username, password, submitted } = this.state;
      console.log("props in Login ", this.props);
      return (
          <div className="col-md-6 col-md-offset-3">
              <h2>Login</h2>
              <form name="form" onSubmit={this.handleSubmit}>
                  <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                      {submitted && !username &&
                          <div className="help-block">Username is required</div>
                      }
                  </div>
                  <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                      {submitted && !password &&
                          <div className="help-block">Password is required</div>
                      }
                  </div>
                  <div className="form-group">
                      <button className="btn btn-primary">Login</button>
                      {loggingIn &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                      <Link to="/register" className="btn btn-link">Register</Link>
                  </div>
              </form>
          </div>
      );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.dispatch(userActions.logout());

    this.state = {
        username: '',
        password: '',
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
}

handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
        dispatch(userActions.login(username, password));
    }
}
  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    console.log("props in Login", this.props);

    if (loggingIn === true) {
      return <Redirect push to='{from}' />
    }
        
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name="username" value={username} onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register" className="btn btn-link"><Button color="primary" className="mt-3" active>Register</Button></Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}



function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
      loggingIn
  };
}
export default withRouter(connect(mapStateToProps)(Login));
