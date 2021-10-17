import React from 'react';

const Button = (props) => {
  return (
    <button
      style={{
        height: '2rem',
        width: props.width === undefined ? '25%' : props.width,
      }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Button;
