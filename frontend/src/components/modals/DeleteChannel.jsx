import {
  Modal, Button, Form,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import useAPI from '../../hooks/useAPI.jsx';

function DeleteChannel(props) {
  const { deleteChannel } = useAPI();
  const { t } = useTranslation();
  const notifySuccess = () => toast.success(t('channel.removed'));
  const notifyError = () => toast.error(t('channel.error'));
  const { onHide, id } = props;
  const handleSubmit = () => {
    deleteChannel({ id }, notifySuccess, notifyError);
    onHide();
  };
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('modal.sure')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* <Form.Label visuallyHidden="true" htmlFor="name">{t('modal.remove')}</Form.Label> */}
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={onHide}
            >
              { t('modal.cancel') }
            </Button>

            <Button type="submit" variant="danger">
              {t('modal.remove')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

DeleteChannel.propTypes = {
  onHide: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default DeleteChannel;
