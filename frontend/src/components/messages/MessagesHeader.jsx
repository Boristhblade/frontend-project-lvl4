import React from 'react';
import PropTypes from 'prop-types';

export default function MessagesHeader({ name, number }) {
  const channelName = `# ${name}`;
  const messages = `${number} сообщения`;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        {messages}
      </span>
    </div>
  );
}

MessagesHeader.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number.isRequired,
};

MessagesHeader.defaultProps = {
  name: 'default',
};
