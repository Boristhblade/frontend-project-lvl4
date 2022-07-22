import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import useAuth from '../../hooks/useAuth.jsx';
import useSocket from '../../hooks/useSocket.jsx';

export default function MessageForm() {
  const socket = useSocket();
  const inputRef = useRef(null);
  const { username } = useAuth();
  const channelId = useSelector((state) => state.currentChannel.currentChannel);
  console.log(channelId);
  useEffect(() => {
    inputRef.current.focus();
  });
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      socket({ username, channelId, body: values.body });
      formik.resetForm();
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group has-validation" controlId="body">
          <Form.Control
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={inputRef}
          />
          <Button type="submit" disabled={!formik.values.body} className="btn btn-group-vertical" variant="light">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
