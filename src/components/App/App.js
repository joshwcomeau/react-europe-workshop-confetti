import React from 'react';
import ConfettiGeyser from '../ConfettiGeyser';

function App() {
  return (
    <ConfettiGeyser
      position={[window.innerWidth / 2, window.innerHeight]}
      duration={2000}
      velocity={15}
      angle={-75}
      spread={20}
      velocityFluctuation={0.75}
      concentration={12}
    />
  );
}

export default App;
