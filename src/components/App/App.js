import React from 'react';
import ConfettiGeyser from '../ConfettiGeyser';

function App() {
  return (
    <>
      <ConfettiGeyser
        position={[window.innerWidth * 0.2, window.innerHeight]}
        duration={2000}
        velocity={25}
        angularVelocity={-0.6}
        angle={-70}
        spread={20}
        volatility={0.75}
        concentration={20}
      />
      <ConfettiGeyser
        position={[window.innerWidth * 0.8, window.innerHeight]}
        duration={2000}
        velocity={25}
        angularVelocity={-0.6}
        angle={-110}
        spread={20}
        volatility={0.75}
        concentration={20}
      />
    </>
  );
}

export default App;
