import React from 'react';
import styled from 'styled-components';

import GlobalStyles from '../GlobalStyles';
import ConfettiGeyser from '../ConfettiGeyser';

function App() {
  return (
    <Wrapper>
      <ConfettiGeyser
        position={[window.innerWidth * 0.2, window.innerHeight]}
        duration={Infinity}
        velocity={25}
        angularVelocity={-0.6}
        angle={-70}
        spread={0}
        volatility={1}
        concentration={12}
      />
      <ConfettiGeyser
        position={[window.innerWidth * 0.8, window.innerHeight]}
        duration={Infinity}
        velocity={25}
        angularVelocity={-0.6}
        angle={-110}
        spread={40}
        volatility={0.5}
        concentration={12}
      />

      <GlobalStyles />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #222;
`;

export default App;
