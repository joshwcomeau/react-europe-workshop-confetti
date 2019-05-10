import React from 'react';
import ConfettiGeyser from '../ConfettiGeyser';

function App() {
  return (
    <ConfettiGeyser
      position={[window.innerWidth / 2, window.innerHeight]}
      duration={2000}
      velocity={10}
      angle={-90}
      consistency={0.5}
      concentration={30}
    />
  );
}

export default App;
