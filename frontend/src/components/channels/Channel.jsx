import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setChannel } from '../../slices/currentChannelSlice.js';
import useModal from '../../hooks/useModal.jsx';

export default function Channel({ name, id, removable }) {
  const { t } = useTranslation();
  const openModal = useModal();
  const dispatch = useDispatch();
  const button = (
    <Button variant="light" className="w-100 rounded-0 text-start btn">
      <span className="me-1">#</span>
      {name}
    </Button>
  );
  const dropdown = (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button variant="light" className="rounded-0 text-start w-100 text-truncate" onClick={() => dispatch(setChannel({ id }))}>
        #
        {' '}
        {name}
      </Button>

      <Dropdown.Toggle split variant="light" className="flex-grow-0 text-end">
        <span className="visually-hidden">{t('channel.manage')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => openModal('deleteChannel', id)}>
          { t('channel.remove') }
        </Dropdown.Item>
        <Dropdown.Item onClick={() => openModal('renameChannel', id)}>
          { t('channel.rename') }
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  return (
    <li className="nav-item w-100" aria-hidden="true">
      {removable ? dropdown : button}
    </li>
  );
}

Channel.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removable: PropTypes.bool.isRequired,
};
