import React from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';

function LoginForm() {
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3" controlId="formBasicEmail">
        <Form.Control type="name" placeholder="Ваш ник" required />
        <Form.Label className="form-label" htmlFor="username">Ваш ник</Form.Label>
      </Form.Group>

      <Form.Group className="form-floating mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Пароль" required />
        <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="outline-primary" type="submit">
          Log in
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
/* <form className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input name="username" required="" placeholder="Ваш ник" id="username" className="form-control" value="" />
        <label className="form-label" htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input name="password" required="" placeholder="Пароль" type="password" id="password" className="form-control" value="" />
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form> */