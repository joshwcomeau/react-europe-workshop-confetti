/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';

import usePhysicsEngine from '../../hooks/use-physics-engine.hook';
import { range } from '../../utils';

import DEFAULT_SPRITES from './default-sprites';

const convertDegreesToRadians = angle => (angle * Math.PI) / 180;

const ConfettiGeyser = ({
  // The position for the geyser.
  // Specified as a tuple-like array, [top, left]
  position,

  // Whether or not confetti particles should bump into each other
  enableCollisions,

  // How much air should affect velocity/gravity
  airFriction,

  // How fast each particle should be moving
  velocity,

  // How much each particle should be rotating
  angularVelocity,

  // The direction that the geyser should be facing
  angle,

  // The amount of deviation from the specified angle
  spread,

  // The amount of deviation from the specified velocity
  volatility,

  // The rate of particles fired, specified as # per second
  // 4: slow
  // 15: moderate
  // 30: intense
  concentration,

  // An array of "sprite" objects, to be sampled from for each particle.
  sprites = DEFAULT_SPRITES,
}) => {
  const canvasRef = React.useRef(null);

  const [engine] = usePhysicsEngine(canvasRef);

  return (
    <Wrapper>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default ConfettiGeyser;
