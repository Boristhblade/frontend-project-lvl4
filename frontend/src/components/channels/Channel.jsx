import React from 'react';
import PropTypes from 'prop-types';

export default function Channel({ name }) {
  return (
    <li className="nav-item w-100">
      <button type="button" className="w-100 rounded-0 text-start btn">
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
}

Channel.propTypes = {
  name: PropTypes.string.isRequired,
};
