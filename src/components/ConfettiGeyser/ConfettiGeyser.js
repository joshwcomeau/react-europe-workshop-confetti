import React from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';

import usePhysicsEngine from '../../hooks/use-physics-engine.hook';
import { random } from '../../utils';

const getRandomValueWithinRange = (value, fluctuation) => {
  const consistency = 1 - fluctuation;

  const minValue = value * consistency;
  const maxValue = value * consistency * -1 + 2 * value;

  return random(minValue, maxValue);
};

const ConfettiGeyser = ({
  // The position for the geyser.
  // Specified as a tuple-like array, [top, left]
  position,

  // How fast each particle should be moving
  velocity,

  // The direction that the geyser should be facing
  angle,

  // The amount of deviation from the specified angle
  spread,

  // The amount of deviation from the specified velocity
  // TODO: Better name
  velocityFluctuation,

  // The number, in milliseconds, for the geyser to run for.
  duration,

  // The rate of particles fired, specified as # per second
  // 4: slow
  // 15: moderate
  // 30: intense
  concentration,
}) => {
  const canvasRef = React.useRef(null);

  const [engine, renderer] = usePhysicsEngine(canvasRef);

  React.useEffect(() => {
    const [top, left] = position;

    if (!engine) {
      return;
    }

    // how many ms needs to pass between each frame?
    const timePerFrame = 1000 / concentration;

    const startAt = performance.now();

    let timeoutId = window.setInterval(() => {
      if (performance.now() - startAt > duration) {
        window.clearInterval(timeoutId);
        return;
      }
      const confettiPiece = Matter.Bodies.rectangle(top, left, 20, 20, {
        frictionAir: 0.04,
        collisionFilter: {
          category: null,
        },
      });

      let imperfectAngle = random(angle - spread / 2, angle + spread / 2);
      let imperfectVelocity = random(
        velocity - velocity * velocityFluctuation,
        velocity + velocity * velocityFluctuation
      );

      const angleInRads = (imperfectAngle * Math.PI) / 180;

      const x = Math.cos(angleInRads) * imperfectVelocity;
      const y = Math.sin(angleInRads) * imperfectVelocity;

      Matter.Body.setVelocity(confettiPiece, {
        x,
        y,
      });

      Matter.Body.setAngularVelocity(confettiPiece, Math.random() * -0.6);

      Matter.World.add(engine.world, [confettiPiece]);
    }, timePerFrame);
  }, [engine]);

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
