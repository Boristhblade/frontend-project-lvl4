import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { createChannel } from '../../sockets/index.js';

function AddChannel(props) {
  const { t } = useTranslation();
  const { onHide } = props;
  const f = useFormik({
    initialValues: { body: '' },
    onSubmit: (values) => {
      createChannel(values.body);
    },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('channel.add')}
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
              value={f.values.body}
              data-testid="input-body"
              name="body"
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary mt-2" value={t('channel.add')} />
        </form>
      </Modal.Body>
    </Modal>
  );
}

AddChannel.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default AddChannel;
