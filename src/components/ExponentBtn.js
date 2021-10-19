import React from 'react';
import Button from './Button';

const ExponentBtn = (props) => {
  return (
    <Button
      value={
        <div>
          {props.number}
          <sup>{props.exponent}</sup>
        </div>
      }
      onClick={props.onClick}
    />
  );
};

export default ExponentBtn;
