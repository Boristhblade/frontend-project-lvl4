import {
  Modal, Button,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { deleteChannel } from '../../sockets/index.js';

function DeleteChannel(props) {
  const { t } = useTranslation();
  const { onHide, id } = props;
  const handleSubmit = () => {
    deleteChannel(id, t('channel.removed'));
  };
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('modal.sure')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
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
        </form>
      </Modal.Body>
    </Modal>
  );
}

DeleteChannel.propTypes = {
  onHide: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default DeleteChannel;
