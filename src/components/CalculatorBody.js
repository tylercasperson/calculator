import React, { useEffect, useState } from 'react';

import Display from './Display';
import Button from './Button';

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
    console.log('numberSetup');
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
    console.log('symbolUsed');
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
          return Math.pow(Number(firstSet), Number(secondSet));
        case 'sqrt':
          return Math.sqrt(Number(firstSet));
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
      setSymbolArr([]);
      setSecondSet([]);
    }

    equation.push(input);
  };

  useEffect(() => {
    if (equation.includes('=')) {
      if (secondSet.length === 0) {
        setEquation([total]);
        setSymbolArr([]);
      }
    }
  }, [equation, firstSet, secondSet, total]);

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
        total={total.length === '' ? 0 : total}
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

          <Button
            value={
              <span style={{ whiteSpace: 'nowrap', fontSize: 'larger' }}>
                &radic;
                <span style={{ textDecoration: 'overline' }}>
                  &nbsp;X&nbsp;
                </span>
              </span>
            }
            onClick={() => symbolsUsed('sqrt')}
          />
          <Button
            value={
              <div>
                x<sup>2</sup>{' '}
              </div>
            }
            onClick={() => symbolsUsed('^')}
          />
          <Button value={'('} />
          <Button value={')'} />

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
                    y
                  </sup>
                </sup>
                &radic;
                <span style={{ textDecoration: 'overline' }}>
                  &nbsp;X&nbsp;
                </span>
              </span>
            }
            onClick={() => symbolsUsed('sqrt')}
          />
          <Button
            value={
              <div>
                x<sup>y</sup>
              </div>
            }
            onClick={() => symbolsUsed('^')}
          />
          <Button
            value={
              <div>
                e<sup>x</sup>
              </div>
            }
            onClick={() => symbolsUsed('^')}
          />
          <Button
            value={
              <div>
                2<sup>x</sup>
              </div>
            }
            onClick={() => symbolsUsed('^')}
          />

          <Button value={'x!'} onClick={() => symbolsUsed('sqrt')} />
          <Button
            value={
              <div>
                <sup>
                  <sup>1</sup>
                </sup>
                <span
                  style={{
                    fontSize: 'x-large',
                  }}
                >
                  /
                </span>
                <span style={{ fontSize: 'x-small' }}>x</span>
              </div>
            }
            onClick={() => symbolsUsed('^')}
          />
          <Button
            value={
              <div>
                y<sup>x</sup>
              </div>
            }
            onClick={() => symbolsUsed('^')}
          />
          <Button
            value={
              <div>
                10<sup>x</sup>
              </div>
            }
            onClick={() => symbolsUsed('^')}
          />

          <Button value={'Random'} onClick={() => symbolsUsed('sqrt')} />
          <Button
            value={<span style={{ fontSize: 'large' }}>&#960;</span>}
            onClick={() => symbolsUsed('^')}
          />
          <Button value={'e'} onClick={() => symbolsUsed('^')} />
          <Button value={'EE'} onClick={() => symbolsUsed('^')} />
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
