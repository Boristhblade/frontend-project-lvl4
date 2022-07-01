import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>name</Form.Label>
        <Form.Control type="name" placeholder="Enter your nickname" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="outline-primary" type="submit">
          Log in
        </Button>
      </div>
    </Form>
  );
}

export default Login;
