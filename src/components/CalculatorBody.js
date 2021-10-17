import React, { useState } from 'react';

import Display from './Display';
import Button from './Button';

const CalculatorBody = () => {
  const [equation, setEquation] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const [total, setTotal] = useState('');
  const [firstSet, setFirstSet] = useState([]);
  const [secondSet, setSecondSet] = useState([]);
  const [symbolArr, setSymbolArr] = useState([]);

  const resetAll = () => {
    setTotal('');
    setEquation([]);
    setFirstSet([]);
    setSecondSet([]);
    setSymbolArr([]);
  };

  const multipleDigits = () => {
    const concatinateNumbers = () => {
      for (let i = 0; i < equation.length; i++) {
        if (!isNaN(equation[i])) {
          if (!isNaN(equation[i + 1])) {
            workspace.push(equation[i].toString() + equation[i + 1].toString());
            i++;
          } else {
            workspace.push(equation[i].toString());
          }
        } else {
          workspace.push(equation[i].toString());
        }
      }
      setEquation(workspace);
      setWorkspace([]);
    };
    concatinateNumbers();
  };

  const numberSetup = (number) => {
    if (symbolArr.length === 0) {
      firstSet.push(number);
    } else {
      secondSet.push(number);
    }
    equation.push(number);

    if (secondSet.length === 0) {
      setTotal(firstSet.join(''));
    } else {
      setTotal(secondSet.join(''));
    }

    multipleDigits();
  };

  const symbolsUsed = (symbol) => {
    if (equation.indexOf('=') === equation.length - 1) {
      setEquation([total, symbol]);
      setFirstSet([total]);
      setSecondSet([]);
      setSymbolArr([symbol]);
    } else {
      symbolArr.push(symbol);
      equation.push(symbol);
    }

    setTotal(symbol);
  };

  const percentage = () => {
    if (secondSet.length === 0) {
      let firstPercentage = Number(firstSet.join('') / 100);
      setFirstSet([firstPercentage]);
      setTotal(firstPercentage);
      equation[0] = firstPercentage;
    } else {
      let secondPercentage = Number(secondSet.join('') / 100);
      setSecondSet([secondPercentage]);
      setTotal(secondPercentage);
      equation[2] = secondPercentage;
    }
  };

  const positiveNegative = () => {
    let changedNumber = Number(total * -1);

    if (secondSet.length === 0) {
      setFirstSet([changedNumber]);
    } else {
      setSecondSet([changedNumber]);
    }
    setTotal(changedNumber);
  };

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

    if (equation.indexOf('=') === -1) {
      setTotal(
        signs(symbolArr.join(''), firstSet.join(''), secondSet.join(''))
      );
      setFirstSet([
        signs(symbolArr.join(''), firstSet.join(''), secondSet.join('')),
      ]);
      setSecondSet([]);
    }

    equation.push(input);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '40vw' }}>
      <Display
        total={total.length === '' ? 0 : total}
        inputHistory={equation.join('')}
      />
      <div style={{ width: '30rem' }}>
        <Button value={'AC'} onClick={() => resetAll()} />
        <Button value={'+/-'} onClick={() => positiveNegative()} />
        <Button value={'%'} onClick={() => percentage()} />
        <Button value={'/'} onClick={() => symbolsUsed('/')} />

        <Button value={7} onClick={() => numberSetup(7)} />
        <Button value={8} onClick={() => numberSetup(8)} />
        <Button value={9} onClick={() => numberSetup(9)} />
        <Button value={'*'} onClick={() => symbolsUsed('*')} />

        <Button value={4} onClick={() => numberSetup(4)} />
        <Button value={5} onClick={() => numberSetup(5)} />
        <Button value={6} onClick={() => numberSetup(6)} />
        <Button value={'-'} onClick={() => symbolsUsed('-')} />

        <Button value={1} onClick={() => numberSetup(1)} />
        <Button value={2} onClick={() => numberSetup(2)} />
        <Button value={3} onClick={() => numberSetup(3)} />
        <Button value={'+'} onClick={() => symbolsUsed('+')} />

        <Button value={0} onClick={() => numberSetup(0)} width={'50%'} />
        <Button value={'.'} onClick={() => numberSetup('.')} />
        <Button value={'='} onClick={() => calculation('=')} />
      </div>
    </div>
  );
};

export default CalculatorBody;
