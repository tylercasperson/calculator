import React from 'react';
import Button from './Button';

const FractionBtn = (props) => {
  return (
    <Button
      value={
        <div>
          <sup>
            <sup>{props.numerator}</sup>
          </sup>
          <span
            style={{
              fontSize: 'x-large',
            }}
          >
            /
          </span>
          <span style={{ fontSize: 'x-small' }}>{props.denominator}</span>
        </div>
      }
      onClick={props.onClick}
    />
  );
};

export default FractionBtn;
