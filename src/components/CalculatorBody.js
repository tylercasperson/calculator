import React from 'react';

import Display from './Display';
import Button from './Button';
import AlgabraicSigns from './AlgabraicSigns';

const CalculatorBody = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '40vw' }}>
      <Display />
      <div style={{ width: '30rem' }}>
        <Button display={'AC'} />
        <Button display={'+/-'} />
        <Button display={'%'} />

        <Button display={7} />
        <Button display={8} />
        <Button display={9} />

        <Button display={4} />
        <Button display={5} />
        <Button display={6} />

        <Button display={1} />
        <Button display={2} />
        <Button display={3} />

        <Button display={0} width={'20rem'} />

        <Button display={'.'} />

        {/* <Button className='fas fa-square-root-alt' /> */}
      </div>
      <div style={{ width: '10rem' }}>
        <AlgabraicSigns />
      </div>
    </div>
  );
};

export default CalculatorBody;
