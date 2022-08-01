import React, { useRef, useState, useEffect } from 'react';
import {
  Form, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { string, object, ref } from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';

function SignupForm() {
  const [loginError, setLoginError] = useState('');
  const auth = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
    },
    validationSchema: object().shape({
      username: string()
        .required(t('signup.required'))
        .min(3, t('signup.usernameConstraints'))
        .max(20, t('signup.usernameConstraints')),
      password: string()
        .required(t('signup.required'))
        .min(6, t('signup.passMin')),
      confirm: string()
        .oneOf([ref('password'), null], t('signup.mustMatch')),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      setLoginError(null);
      const userInfo = { username: values.username, password: values.password };
      axios.post('/api/v1/signup', userInfo)
        .then(({ data }) => {
          localStorage.setItem('userId', JSON.stringify(data));
          auth.logIn();
          navigate('/');
        })
        .catch((err) => {
          if (err.isAxiosError && err.response.status === 409) {
            setLoginError(t('signup.exist'));
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
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <Form.Control
          type="name"
          placeholder={t('signup.username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={!!formik.errors.username || !!loginError}
          ref={inputRef}
        />
        <Form.Label className="form-label">{t('signup.username')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.username || loginError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-3" controlId="password">
        <Form.Control
          type="password"
          placeholder={t('signup.password')}
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={!!formik.errors.password}
        />
        <Form.Label className="form-label">{t('signup.password')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="form-floating mb-3" controlId="confirm">
        <Form.Control
          type="password"
          placeholder={t('signup.confirm')}
          onChange={formik.handleChange}
          value={formik.values.confirm}
          isInvalid={!!formik.errors.confirm}
        />
        <Form.Label className="form-label">{t('signup.confirm')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirm}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid gap-2">
        <Button variant="outline-primary" type="submit">
          {t('signup.submit')}
        </Button>
      </div>
    </Form>
  );
}

export default SignupForm;
