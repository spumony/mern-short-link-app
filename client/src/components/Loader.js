import React from 'react';

const Loader = () => {
  return (
    <div className="spinner-border text-primary" role="status"
      style={{display: 'flex', justifyContent: 'center', paddingTop: '2rem'}}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
