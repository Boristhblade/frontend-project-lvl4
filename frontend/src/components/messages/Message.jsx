import React from 'react';
import PropTypes from 'prop-types';

export default function Message({ body, username }) {
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {body}
    </div>
  );
}

Message.propTypes = {
  body: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
