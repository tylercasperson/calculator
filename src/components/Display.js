import React from 'react';

const Display = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '40vw',
        height: '3rem',
        border: '1pt solid black',
        justifyContent: 'flex-end',
      }}
    >
      {props.total}
    </div>
  );
};

export default Display;
