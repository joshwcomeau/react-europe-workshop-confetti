import React from 'react';
import styled from 'styled-components';

import ConfettiGeyser from '../ConfettiGeyser';

import PlaygroundControl from './PlaygroundControl';

const GeyserPlayground = () => {
  const [position] = React.useState([
    window.innerWidth / 2,
    window.innerHeight,
  ]);

  const [enableCollisions, setEnableCollisions] = React.useState(false);
  const [airFriction, setAirFriction] = React.useState(0.04);
  const [velocity, setVelocity] = React.useState(29);
  const [angularVelocity, setAngularVelocity] = React.useState(0.6);
  const [angle, setAngle] = React.useState(-80);
  const [spread, setSpread] = React.useState(20);
  const [volatility, setVolatility] = React.useState(0.75);
  const [concentration, setConcentration] = React.useState(20);

  return (
    <>
      <ConfettiGeyser
        position={position}
        enableCollisions={enableCollisions}
        airFriction={airFriction}
        velocity={velocity}
        angularVelocity={angularVelocity}
        angle={angle}
        spread={spread}
        volatility={volatility}
        concentration={concentration}
      />

      <Controls>
        <PlaygroundControl
          kind="boolean"
          label="Enable Collisions"
          value={enableCollisions}
          setValue={setEnableCollisions}
        />

        <PlaygroundControl
          kind="slider"
          label="Air Friction"
          min={0}
          max={0.1}
          step={0.001}
          value={airFriction}
          setValue={setAirFriction}
        />
        <PlaygroundControl
          kind="slider"
          label="Velocity"
          min={5}
          max={50}
          value={velocity}
          setValue={setVelocity}
        />
        <PlaygroundControl
          kind="slider"
          label="Angle"
          min={-180}
          max={0}
          value={angle}
          setValue={setAngle}
        />
        <PlaygroundControl
          kind="slider"
          label="Angular Velocity"
          min={0}
          max={2}
          step={0.01}
          value={angularVelocity}
          setValue={setAngularVelocity}
        />
        <PlaygroundControl
          kind="slider"
          label="Spread"
          min={0}
          max={90}
          value={spread}
          setValue={setSpread}
        />
        <PlaygroundControl
          kind="slider"
          label="Volatility"
          min={0}
          max={1}
          step={0.01}
          value={volatility}
          setValue={setVolatility}
        />
        <PlaygroundControl
          kind="slider"
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
