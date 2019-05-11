import React from 'react';
import styled from 'styled-components';

import ConfettiGeyser from '../ConfettiGeyser';
import SliderControl from '../SliderControl';

const GeyserPlayground = () => {
  const [position, setPosition] = React.useState([
    window.innerWidth / 2,
    window.innerHeight,
  ]);
  const [velocity, setVelocity] = React.useState(29);
  const [angularVelocity, setAngularVelocity] = React.useState(-0.6);
  const [angle, setAngle] = React.useState(-90);
  const [spread, setSpread] = React.useState(20);
  const [volatility, setVolatility] = React.useState(0.75);
  const [concentration, setConcentration] = React.useState(60);

  return (
    <>
      <ConfettiGeyser
        position={position}
        velocity={velocity}
        angularVelocity={angularVelocity}
        angle={angle}
        spread={spread}
        volatility={volatility}
        concentration={concentration}
      />

      <Controls>
        <SliderControl
          label="Velocity"
          min={5}
          max={50}
          value={velocity}
          setValue={setVelocity}
        />
        <SliderControl
          label="Angle"
          min={-180}
          max={0}
          value={angle}
          setValue={setAngle}
        />
        <SliderControl
          label="Angular Velocity"
          min={-2}
          max={2}
          step={0.01}
          value={angularVelocity}
          setValue={setAngularVelocity}
        />
        <SliderControl
          label="Spread"
          min={0}
          max={90}
          value={spread}
          setValue={setSpread}
        />
        <SliderControl
          label="Volatility"
          min={0}
          max={1}
          step={0.01}
          value={volatility}
          setValue={setVolatility}
        />
        <SliderControl
          label="Concentration"
          min={5}
          max={100}
          value={concentration}
          setValue={setConcentration}
        />
      </Controls>
    </>
  );
};

const Controls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default GeyserPlayground;
