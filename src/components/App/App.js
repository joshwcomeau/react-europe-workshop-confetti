import React from 'react';
import styled from 'styled-components';

import GlobalStyles from '../GlobalStyles';
import GeyserPlayground from '../GeyserPlayground/GeyserPlayground';

function App() {
  return (
    <Wrapper>
      <GeyserPlayground />

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
