import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// object validator
import * as Yup from 'yup';

// form helper
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { userActions } from '../../../actions/user.actions';

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Small!')
    .max(30, 'Too Big!')
    .required('Required'),
  email: Yup.string()
    .email('Required'),
  password: Yup.string()
    .required('Required'),
  password_repeat: Yup.string()
    .required('Required'),
});

class Register extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      email: "",
      password: "",
      password_repeat: '',
      submitted: false,
    };
  }


  render() {
    const { loggingIn } = this.props;
    const { username, email, password, password_repeat, submitted } = this.state;
    console.log("props in Login", this.props);
    const { user, selected } = this.props;

    return (
      
      <div className="app flex-row align-items-center">
      <Formik
      initialValues={{ username:'', email: '', password: '', password_repeat: '' }}
      validationSchema={UserSchema}
      validateOnChange
      
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
          <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>Username
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field className="form-control" type="text" name="username" />
                      <ErrorMessage name="username" component="div" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>Email
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field className="form-control" type="email" name="email" />
                      <ErrorMessage name="email" component="div" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>Password
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field className="form-control" type="password" name="password" />
                      <ErrorMessage name="password" component="div" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>Password Confirm
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field className="form-control" type="password" name="password_repeat" />
                      <ErrorMessage name="password_repeat" component="div" />
                    </InputGroup>
                    <Button type="submit" disabled={isSubmitting} color="success" block>Create Account</Button>
                  </Form>
                    </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
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
export default withRouter(connect(mapStateToProps)(Register));

