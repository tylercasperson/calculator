import React from 'react';

const Button = (props) => {
  const btnOptions = (btnPressed) => {
    switch (btnPressed) {
      case 0:
        return console.log(0);
      case 1:
        return console.log(1);
      case 2:
        return console.log(2);
      case 3:
        return console.log(3);
      case 4:
        return console.log(4);
      case 5:
        return console.log(5);
      case 6:
        return console.log(6);
      case 7:
        return console.log(7);
      case 8:
        return console.log(8);
      case 9:
        return console.log(9);
      case '+':
        return console.log('+');
      case '-':
        return console.log('-');
      case '*':
        return console.log('*');
      case '/':
        return console.log('/');
      case '.':
        return console.log('.');
      case 'AC':
        return console.log('AC');
      case '%':
        return console.log('%');
      case '+/-':
        return console.log('+/-');
      default:
        return;
    }
  };
  return (
    <button
      style={{
        height: '2rem',
        width: props.width === undefined ? '10rem' : props.width,
      }}
      className={props.className}
      onClick={() => btnOptions(props.display)}
    >
      {props.display}
    </button>
  );
};

export default Button;
