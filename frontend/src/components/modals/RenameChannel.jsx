import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAPI from '../../hooks/useAPI.jsx';

function RenameChannel(props) {
  const channels = useSelector((state) => state.channels);
  const names = Object.values(channels.entities).map((item) => item.name);
  const { renameChannel } = useAPI();
  const { t } = useTranslation();
  const notifySuccess = () => toast.success(t('channel.renamed'));
  const notifyError = () => toast.error(t('channel.error'));
  const { onHide, id } = props;
  const f = useFormik({
    initialValues: {
      name: '',
      id,
    },
    onSubmit: (values) => {
      renameChannel(values, notifySuccess, notifyError);
      onHide();
    },
    validationSchema: Yup.object().shape({
      name: Yup
        .string()
        .required(t('signup.required'))
        .trim()
        .min(3, t('signup.usernameConstraints'))
        .max(20, t('signup.usernameConstraints'))
        .notOneOf(names, t('modal.uniq')),
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('modal.rename')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit} noValidate>
          <Form.Group>
            <Form.Label visuallyHidden="true" htmlFor="name">{t('modal.rename')}</Form.Label>
            <Form.Control
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              id="name"
              name="name"
              className="mb-3"
              isInvalid={!!f.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={onHide}
            >
              { t('modal.cancel') }
            </Button>

            <Button type="submit" variant="primary">
              {t('modal.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

RenameChannel.propTypes = {
  onHide: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default RenameChannel;
