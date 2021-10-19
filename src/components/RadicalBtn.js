import React from 'react';
import Button from './Button';

const RadicalBtn = (props) => {
  return (
    <Button
      value={
        <span style={{ whiteSpace: 'nowrap', fontSize: 'larger' }}>
          <sup>
            <sup
              style={{
                position: 'relative',
                left: '5%',
                fontSize: 'smaller',
              }}
            >
              {props.exponent}
            </sup>
          </sup>
          &radic;
          <span style={{ textDecoration: 'overline' }}>
            &nbsp;{props.number}&nbsp;
          </span>
        </span>
      }
      onClick={props.onClick}
    />
  );
};

export default RadicalBtn;
