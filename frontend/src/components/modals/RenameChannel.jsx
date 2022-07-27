import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { renameChannel } from '../../sockets/index.js';

function RenameChannel(props) {
  const channels = useSelector((state) => state.channels);
  const names = Object.values(channels.entities).map((item) => item.name);
  const { t } = useTranslation();
  const notify = () => toast.success(t('channel.renamed'));
  const { onHide, id } = props;
  const f = useFormik({
    initialValues: {
      name: '',
      id,
    },
    onSubmit: (values) => {
      renameChannel(values);
      onHide();
      notify();
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
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="name"
              className="mb-3"
              isInvalid={!!f.errors.name}
            />
            <FormControl.Feedback type="invalid">
              {f.errors.name}
            </FormControl.Feedback>
          </FormGroup>
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
        </form>
      </Modal.Body>
    </Modal>
  );
}

RenameChannel.propTypes = {
  onHide: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default RenameChannel;