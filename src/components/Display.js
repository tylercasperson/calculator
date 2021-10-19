import React from 'react';

const Display = (props) => {
  return (
    <div style={{ border: '1pt solid black' }}>
      <div
        style={{
          display: 'flex',
          padding: '0 3px 1px 0px',
          marginTop: '5px',
          height: '2rem',
          justifyContent: 'flex-end',
          fontSize: 'smaller',
        }}
      >
        {props.inputHistory}
      </div>
      <div
        style={{
          display: 'flex',
          padding: '0 3px 3px 0px',
          width: '80vw',
          height: '1.5rem',
          justifyContent: 'flex-end',
        }}
      >
        {props.currentWork}
      </div>
    </div>
  );
};

export default Display;
