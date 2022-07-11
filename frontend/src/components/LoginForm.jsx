import React from 'react';
import {
  Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import cn from 'classnames';

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: object().shape({
      name: string().required('Required').min(4, 'Must be at least 4 symbols'),
      password: string().required('Required').min(5, 'Must be at least 5 symbols'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(formik);
      alert(JSON.stringify(values));
    },
  });
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" noValidate onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3" controlId="name">
        <Form.Control
          type="name"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.name}
          isValid={formik.touched.name && !formik.errors.name}
        />
        <Form.Label className="form-label">Ваш ник</Form.Label>
        <Form.Control.Feedback>
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-3" controlId="password">
        <Form.Control
          type="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          isValid={formik.touched.password && !formik.errors.password}
        />
        <Form.Label className="form-label">Пароль</Form.Label>
        <Form.Control.Feedback>
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
/* <form className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input name="username" required="" placeholder="Ваш ник"
        id="username" className="form-control" value="" />
        <label className="form-label" htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input name="password" required="" placeholder="Пароль"
        type="password" id="password" className="form-control" value="" />
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form> */
