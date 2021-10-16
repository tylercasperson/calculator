import React, { useState } from 'react';

import Display from './Display';
import Button from './Button';

const CalculatorBody = () => {
  const [total, setTotal] = useState(0);
  const [equation, setEquation] = useState([]);

  const calculation = (input) => {
    const signs = (sign, firstSet, secondSet) => {
      switch (sign) {
        case '+':
          return Number(firstSet) + Number(secondSet);
        case '-':
          return Number(firstSet) - Number(secondSet);
        case '*':
          return Number(firstSet) * Number(secondSet);
        case '/':
          return Number(firstSet) / Number(secondSet);
        default:
          return 'number';
      }
    };

    if (input === '=') {
      let firstSet = [];
      let symbolArr = [];
      let secondSet = [];
      for (let i = 0; i < equation.length; i++) {
        if (!isNaN(equation[i]) || equation[i] === '.') {
          if (symbolArr.length === 0) {
            firstSet.push(equation[i]);
          } else if (symbolArr.length !== 0) {
            secondSet.push(equation[i]);
          }
        } else {
          symbolArr.push(equation[i]);
        }
      }

      setTotal(
        signs(symbolArr.join(''), firstSet.join(''), secondSet.join(''))
      );
    } else {
      setTotal(input);
    }
    equation.push(input);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '40vw' }}>
      <Display total={total} />
      <div style={{ width: '30rem' }}>
        <Button value={'AC'} onClick={() => calculation()} />
        <Button value={'+/-'} />
        <Button value={'%'} />
        <Button value={'/'} onClick={() => calculation('/')} />

        <Button value={7} onClick={() => calculation(7)} />
        <Button value={8} onClick={() => calculation(8)} />
        <Button value={9} onClick={() => calculation(9)} />
        <Button value={'*'} onClick={() => calculation('*')} />

        <Button value={4} onClick={() => calculation(4)} />
        <Button value={5} onClick={() => calculation(5)} />
        <Button value={6} onClick={() => calculation(6)} />
        <Button value={'-'} onClick={() => calculation('-')} />

        <Button value={1} onClick={() => calculation(1)} />
        <Button value={2} onClick={() => calculation(2)} />
        <Button value={3} onClick={() => calculation(3)} />
        <Button value={'+'} onClick={() => calculation('+')} />

        <Button value={0} onClick={() => calculation(0)} width={'50%'} />
        <Button value={'.'} onClick={() => calculation('.')} />
        <Button value={'='} onClick={() => calculation('=')} />
      </div>
    </div>
  );
};

export default CalculatorBody;
