import React from 'react';
import './Loader.scss';

const Loader = () => (
  <div>
    <div className="overlay">
      <div className="loader-container">
        <div className="lds-spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  </div>
);

export default Loader;
