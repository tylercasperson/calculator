import React, { useEffect, useState } from 'react';

import Display from './Display';
import Button from './Button';
import ExponentBtn from './ExponentBtn.js';
import RadicalBtn from './RadicalBtn';
import FractionBtn from './FractionBtn';

const CalculatorBody = () => {
  const [equation, setEquation] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const [total, setTotal] = useState('');
  const [firstSet, setFirstSet] = useState([]);
  const [secondSet, setSecondSet] = useState([]);
  const [symbolArr, setSymbolArr] = useState([]);
  const [memory, setMemory] = useState(0);

  const resetAll = () => {
    console.log('resetAll');
    setTotal('');
    setEquation([]);
    setFirstSet([]);
    setSecondSet([]);
    setSymbolArr([]);
  };

  const multipleDigits = () => {
    console.log('multipleDigits');
    const concatinateNumbers = () => {
      console.log('concatinateNumbers');
      let numbersArr = [];
      let notNumbersArr = [];
      for (let i = 0; i < equation.length; i++) {
        if (isNaN(equation[i])) {
          notNumbersArr.push(equation[i]);
          if (!isNaN(equation[i + 1])) {
            workspace.push(notNumbersArr.join(''));
            notNumbersArr = [];
          }
        } else {
          numbersArr.push(equation[i]);
          if (isNaN(equation[i + 1])) {
            workspace.push(numbersArr.join(''));
            numbersArr = [];
          }
        }
        // if (!isNaN(equation[i])) {
        //   console.log(1);
        //   if (!isNaN(equation[i + 1])) {
        //     console.log(2);
        //     workspace.push(equation[i].toString() + equation[i + 1].toString());
        //     i++;
        //   } else {
        //     console.log(3);
        //     workspace.push(equation[i].toString());
        //   }
        // } else {
        //   console.log(4);
        //   if (symbolArr[symbolArr.length - 1] !== 'radical') {
        //     console.log(5);
        //     console.log(workspace);
        //     console.log(equation);
        //     console.log(symbolArr);
        //     workspace.push(equation[i].toString());
        //   }
        // }
      }

      if (symbolArr[symbolArr.length - 1] === 'radical') {
        radicals();
      } else if (symbolArr[symbolArr.length - 1] === 'exponents') {
        console.log('here', exponents(firstSet, secondSet));
      } else {
        setEquation(workspace);
      }
      setWorkspace([]);
    };

    concatinateNumbers();
  };

  const numberSetup = (number) => {
    console.log('numberSetup');

    // if (symbolArr[symbolArr.length - 1] === 'radical') {
    //   secondSet.push(number);
    //   radicals('radical');
    // } else {
    if (symbolArr.length === 0) {
      firstSet.push(number);
    } else {
      secondSet.push(number);
    }
    equation.push(number);
    // }

    if (secondSet.length === 0) {
      setTotal(firstSet.join(''));
    } else {
      setTotal(secondSet.join(''));
    }

    multipleDigits();
  };

  const symbolsUsed = (symbol) => {
    console.log('symbolUsed');

    if (equation.length === 0) {
      setFirstSet([symbol]);
      setEquation([symbol]);
      setSymbolArr([symbol]);
    } else {
      if (equation[equation.length - 1].key === '1') {
        setEquation([
          Math.sqrt(
            equation[equation.length - 1].props.children[1].props.children[1]
          ),
          symbol,
        ]);
      }
      if (equation.indexOf('=') === equation.length - 1) {
        setEquation([total, symbol]);
        setFirstSet([total]);
        setSecondSet([]);
        setSymbolArr([symbol]);
      } else {
        if (symbol === 'sqrt') {
          symbolArr.push(symbol);
        } else {
          symbolArr.push(symbol);
          equation.push(symbol);
        }
      }
    }
    setTotal(symbol);
  };

  const percentage = () => {
    console.log('percentage');
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
    console.log('positiveNegative');
    let changedNumber = Number(total * -1);

    if (secondSet.length === 0) {
      setFirstSet([changedNumber]);
    } else {
      setSecondSet([changedNumber]);
    }
    setTotal(changedNumber);
  };

  const memoryFunction = (option) => {
    console.log('memoryFunction');
    switch (option) {
      case 'mr':
        return setTotal(memory);
      case 'm+':
        return setMemory(Number(total) + memory);
      case 'm-':
        return setMemory(memory - Number(total));
      case 'mc':
        return setMemory(0);
      default:
        return;
    }
  };

  const radicals = (option) => {
    console.log('radicals');

    if (option === 'sqrt') {
      let squareRoot = (
        <span key={1} style={{ whiteSpace: 'nowrap', fontSize: 'larger' }}>
          &radic;
          <span>&nbsp;{total}</span>
        </span>
      );

      symbolsUsed('sqrt');
      equation.pop();
      equation.push(squareRoot);
      calculation('sqrt');
    } else {
      let y = secondSet.length === 0 ? 'y' : secondSet.join('');
      let radical = (
        <div key={2}>
          <sup>{y}</sup>
          <span style={{ whiteSpace: 'nowrap', fontSize: 'larger' }}>
            &radic;
            <span>&nbsp;{firstSet.join('')}</span>
          </span>
        </div>
      );

      if (secondSet.length === 0) {
        symbolsUsed('radical');
        equation.shift();
        equation.pop();
        equation.push(radical);
      }

      setTotal(radical);
      setEquation([radical]);

      //   calculation('radical');
      console.log('y: ', y);
      console.log('e: ', equation);
      console.log('1: ', firstSet);
      console.log('2: ', secondSet);
      console.log('t: ', total);
      console.log('s: ', symbolArr);
    }
  };

  const exponents = (number, exponent, type) => {
    symbolArr.push('exponents');
    if (type === 'squared') {
      let calculatedTotal = Math.pow(number, exponent);
      setTotal(calculatedTotal);
      setEquation([
        number,
        <sup key={2}>
          <sup>{exponent}</sup>
        </sup>,
      ]);

      setFirstSet([calculatedTotal]);
    } else if (type === 'yx') {
      let y =
        secondSet.length === 0
          ? type === 'other'
            ? 'x'
            : 'y'
          : secondSet.join('');
      setFirstSet([exponent]);
      console.log('number:', exponent);
      setEquation([
        <div key={3}>
          {y}
          <sup key={2}>{exponent}</sup>
        </div>,
      ]);
    } else {
      let y =
        secondSet.length === 0
          ? type === 'other'
            ? 'x'
            : 'y'
          : secondSet.join('');
      setFirstSet([number]);
      setEquation([
        <div key={'exponent'}>
          {number}
          <sup>{y}</sup>
        </div>,
      ]);
    }
  };

  const factorial = (number) => {
    let answer = 1;

    for (let i = number; i > 0; i--) {
      answer = i * answer;
    }
    setTotal(answer);
    equation.push('!=');
  };

  const fraction = (type) => {
    let x = firstSet.length === 0 ? 'x' : firstSet[0];
    if (type === '1/x') {
      equation.push('1/' + x);
    }
    setTotal(1 / firstSet.join(''));
    setEquation(['1/', firstSet.join(''), '=']);
  };

  const fixedNumbers = (sign) => {
    switch (sign) {
      case 'random':
        return console.log(Math.random());
      case 'pi':
        return console.log(Math.PI);
      case 'e':
        return console.log(Math.E);
      case 'EE':
        workspace.push(total);
        for (let i = 0; i < total; i++) {
          equation.push(0);
          workspace.push(0);
        }
        setTotal(workspace);
        if (firstSet[0] === Number(total)) {
          firstSet[0] = Number(workspace.join(''));
        } else if (secondSet[0] === Number(total)) {
          setSecondSet([Number(workspace.join(''))]);
        }
        setWorkspace([]);
        break;
      default:
        return;
    }
  };

  const calculation = (input) => {
    console.log('calculation');
    const signs = (sign, firstSet, secondSet) => {
      console.log('signs');
      switch (sign) {
        case '+':
          return Number(firstSet) + Number(secondSet);
        case '-':
          return Number(firstSet) - Number(secondSet);
        case '*':
          return Number(firstSet) * Number(secondSet);
        case '/':
          return Number(firstSet) / Number(secondSet);
        case '^':
        case 'exponents':
          return Math.pow(Number(firstSet), Number(secondSet));
        case 'sqrt':
          return Math.sqrt(Number(firstSet));
        case 'radical':
          return Math.pow(Number(firstSet), 1 / Number(secondSet));
        default:
          return 'number';
      }
    };

    if (equation.indexOf('=') === -1) {
      let calculatedTotal = signs(
        symbolArr[0],
        firstSet.join(''),
        secondSet.join('')
      );
      setTotal(calculatedTotal);
      setFirstSet([calculatedTotal]);
      setSymbolArr([]);
      setSecondSet([]);
    }

    if (input !== 'sqrt' || input !== 'radical') {
      equation.push(input);
    }
  };

  useEffect(() => {
    if (equation.includes('=')) {
      if (secondSet.length === 0 && symbolArr.length !== 0) {
        setEquation([total]);
        setSymbolArr([]);
      }
    }
    console.log('e: ', equation);
    console.log('1: ', firstSet);
    console.log('2: ', secondSet);
    console.log('t: ', total);
    console.log('s: ', symbolArr);
  }, [equation, firstSet, secondSet, total, symbolArr, workspace]);

  return (
    <div
      style={{
        display: 'block',
        width: '80vw',
        height: '20vh',
      }}
    >
      <Display
        inputHistory={equation}
        currentWork={total}
        // currentWork={total.length === '' ? 0 : total}
      />

      <div
        style={{
          display: 'flex',
          alignContent: 'space-evenly',
          border: '1pt solid black',
        }}
      >
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexWrap: 'wrap',
            flexGrow: '1',
          }}
        >
          <Button value={'mr'} onClick={() => memoryFunction('mr')} />
          <Button value={'m+'} onClick={() => memoryFunction('m+')} />
          <Button value={'m-'} onClick={() => memoryFunction('m-')} />
          <Button value={'mc'} onClick={() => memoryFunction('mc')} />

          <RadicalBtn number={'x'} onClick={() => radicals('sqrt')} />
          <ExponentBtn
            number={'x'}
            exponent={'2'}
            onClick={() => exponents(total, 2, 'squared')}
          />
          <Button value={'('} onClick={() => symbolsUsed('(')} />
          <Button value={')'} onClick={() => symbolsUsed(')')} />

          <RadicalBtn
            number={'x'}
            exponent={'y'}
            onClick={() => radicals('radical')}
          />
          <ExponentBtn
            number={'x'}
            exponent={'y'}
            onClick={() =>
              exponents(Number(firstSet.join('')), Number(secondSet.join('')))
            }
          />
          <ExponentBtn
            number={'e'}
            exponent={'x'}
            onClick={() =>
              exponents(Number(Math.E), Number(firstSet.join('')), 'other')
            }
          />
          <ExponentBtn
            number={'2'}
            exponent={'x'}
            onClick={() => exponents(2, Number(firstSet.join('')), 'other')}
          />

          <Button value={'x!'} onClick={() => factorial(total)} />
          <ExponentBtn
            number={'y'}
            exponent={'x'}
            onClick={() =>
              exponents(
                Number(secondSet.join('')),
                Number(firstSet.join('')),
                'yx'
              )
            }
          />
          <FractionBtn
            numerator={'1'}
            denominator={'x'}
            onClick={() => fraction('1/x')}
          />
          <ExponentBtn
            number={10}
            exponent={'x'}
            onClick={() => exponents(10, Number(firstSet.join('')), 'other')}
          />

          <Button value={'Random'} onClick={() => fixedNumbers('random')} />
          <Button
            value={<span style={{ fontSize: 'large' }}>&#960;</span>}
            onClick={() => fixedNumbers('pi')}
          />
          <Button value={'e'} onClick={() => fixedNumbers('e')} />
          <Button value={'EE'} onClick={() => fixedNumbers('EE')} />
        </div>

        <div style={{ flex: '2', width: '40rem', flexGrow: '1' }}>
          <Button
            value={equation.length === 0 ? 'AC' : 'C'}
            onClick={() => resetAll()}
          />
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
    </div>
  );
};

export default CalculatorBody;
