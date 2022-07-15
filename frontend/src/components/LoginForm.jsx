import React, { useRef, useState, useEffect } from 'react';
import {
  Form, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import axios from 'axios';
import useAuth from '../hooks/useAuth.jsx';
// import cn from 'classnames';

function LoginForm() {
  const [loginError, setLoginError] = useState('');
  const auth = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  // const auth = useContext(authContext);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object().shape({
      username: string().required('Name is a required field').min(4, 'Must be at least 4 symbols'),
      password: string().required('Password is a required field').min(5, 'Must be at least 5 symbols'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setLoginError(null);
      axios.post('/api/v1/login', values)
        .then(({ data }) => {
          localStorage.setItem('userId', JSON.stringify(data));
          auth.logIn();
          navigate('/');
        })
        .catch((err) => {
          if (err.isAxiosError && err.response.status === 401) {
            setLoginError('User does not exit or incorrect password');
          }
          throw err;
        });
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          type="name"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={!!formik.errors.username || !!loginError}
          ref={inputRef}
        />
        <Form.Label className="form-label">Ваш ник</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.username || loginError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-3" controlId="password">
        <Form.Control
          type="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={!!formik.errors.password}
        />
        <Form.Label className="form-label">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
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
