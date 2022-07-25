import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { createChannel } from '../../sockets/index.js';

const generateOnSubmit = ({ setItems, onHide }) => (values) => {
  const item = { id: _.uniqueId(), body: values.body };
  setItems((items) => {
    items.push(item);
  });
  onHide();
};

function AddChannel(props) {
  const { onHide } = props;
  const f = useFormik({
    onSubmit: createChannel(),
    initialValues: { body: '' },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add</Modal.Title>
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
          <input type="submit" className="btn btn-primary mt-2" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
