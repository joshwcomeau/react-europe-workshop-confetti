import React from 'react';
import ConfettiGeyser from '../ConfettiGeyser';

function App() {
  return (
    <ConfettiGeyser
      duration={2000}
      angle={-90}
      position={[window.innerWidth / 2, window.innerHeight]}
    />
  );
}

export default App;
