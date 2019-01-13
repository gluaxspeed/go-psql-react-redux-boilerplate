import React from 'react';
import './style.scss';

function LoadingIndicator(props) {
  if (props.error) {
    console.log(props.error);
    return (<div>Error! <button onClick={ props.retry }>Retry</button></div>);
  } else {
    return (
      <div className="loading-indicator">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
};

export default LoadingIndicator;