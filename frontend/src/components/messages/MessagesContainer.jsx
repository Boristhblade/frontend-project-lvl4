import React from 'react';
import PropTypes from 'prop-types';

export default function MessagesContainer({ children }) {
  return (
    <div className="col p-0 h-100">
      {children}
    </div>
  );
}

MessagesContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
