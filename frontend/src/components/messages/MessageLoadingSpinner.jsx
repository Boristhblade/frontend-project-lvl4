import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function LoadingSpinner() {
  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <TailSpin color="#999999" height="100" width="100" />
      </div>
    </div>
  )
}
