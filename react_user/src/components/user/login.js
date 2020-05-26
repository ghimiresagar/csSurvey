import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
// import '../../App.css';

function Login() {
    const crypto = require('crypto');

    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);

    };
  
    return (
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4">
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Username:</Form.Label>
                    <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a username.
                    </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="4">
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomPassword">
                    <Form.Label>Password:</Form.Label>
                    <InputGroup>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password.
                    </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                </Form.Group>
            </Form.Row>
            <div className="text-center">
                <Button type="submit">
                    Submit
                </Button>
            </div>
          </Form>
      </Container>
    );
  }

  export default Login;
