import React from 'react';

const Display = (props) => {
  return (
    <div style={{ border: '1pt solid black' }}>
      <div
        style={{
          display: 'flex',
          padding: '0 3px 1px 0px',
          height: '2rem',
          justifyContent: 'flex-end',
        }}
      >
        {props.inputHistory}
      </div>
      <div
        style={{
          display: 'flex',
          padding: '0 3px 3px 0px',
          width: '40vw',
          height: '1rem',
          justifyContent: 'flex-end',
        }}
      >
        {props.total}
      </div>
    </div>
  );
};

export default Display;
