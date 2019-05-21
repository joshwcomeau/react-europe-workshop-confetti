import React from 'react';

import ConfettiGeyser from '../ConfettiGeyser';

const BurstGeyser = ({ concentration, ...delegated }) => {
  return (
    <>
      <ConfettiGeyser concentration={concentration} {...delegated} />
      <ConfettiGeyser
        concentration={concentration * 10}
        duration={500}
        {...delegated}
      />
    </>
  );
};

export default BurstGeyser;
