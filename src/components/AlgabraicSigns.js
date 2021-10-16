import React from 'react';
import Button from './Button';

const AlgabraicSigns = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button display={'+'} />
      <Button display={'-'} />
      <Button display={'*'} />
      <Button display={'/'} />
      <Button display={'='} />
    </div>
  );
};

export default AlgabraicSigns;
