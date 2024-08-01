import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
}

export default Spinner;