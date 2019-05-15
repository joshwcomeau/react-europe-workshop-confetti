/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';

import usePhysicsEngine from '../../hooks/use-physics-engine.hook';
import useInterval from '../../hooks/use-interval.hook';
import { range, sample, random, normalize } from '../../utils';

import DEFAULT_SPRITES from './default-sprites';

const convertDegreesToRadians = angle => (angle * Math.PI) / 180;

const useGeneratedParticles = (
  engine,
  position,
  angle,
  velocity,
  concentration,
  airFriction,
  angularVelocity,
  enableCollisions,
  volatility,
  spread
) => {
  const timeBetweenParticles = 1000 / concentration;

  useInterval(() => {
    if (!engine) {
      return;
    }

    const [top, left] = position;

    const sprite = sample(DEFAULT_SPRITES);

    const config = {
      frictionAir: airFriction * sprite.airFrictionMultiplier,
      render: {
        sprite: {
          texture: sprite.src,
        },
      },
    };

    if (!enableCollisions) {
      config.collisionFilter = {
        category: null,
      };
    }

    const particle = Matter.Bodies.rectangle(
      top,
      left,
      sprite.width,
      sprite.height,
      config
    );

    const particleAngle = random(angle - spread, angle + spread);

    const velocityMultiple = Math.random();

    // `normalize` maps a value from one range to another.
    // Our `velocityMultiple` is a random number between 0 and 1, and we want
    // to map that value to the current range of our velocity/angularVelocity,
    // based on volatility.
    //
    // eg. if velocity is 50 and volatility is 0.5, our velocity range is
    // 25-75. This does the following mapping for `velocityMultiple`:
    //
    //   0    -> 25
    //   0.5  -> 50
    //   0.75 -> 62.5
    //   1    -> 75
    const particleVelocity = normalize(
      velocityMultiple,
      0,
      1,
      velocity - velocity * volatility,
      velocity + velocity * volatility
    );
    const particleAngularVelocity = normalize(
      velocityMultiple,
      0,
      1,
      angularVelocity - angularVelocity * volatility,
      angularVelocity + angularVelocity * volatility
    );

    const particleAngleInRads = convertDegreesToRadians(particleAngle);

    const x = Math.cos(particleAngleInRads) * particleVelocity;
    const y = Math.sin(particleAngleInRads) * particleVelocity;

    Matter.Body.setVelocity(particle, { x, y });
    Matter.Body.setAngularVelocity(particle, particleAngularVelocity);

    Matter.World.add(engine.world, [particle]);
  }, timeBetweenParticles);
};

const useParticleCleanup = engine => {
  useInterval(() => {
    if (!engine) {
      return;
    }

    Matter.Composite.allBodies(engine.world).forEach(particle => {
      if (particle.position.y > window.innerHeight) {
        Matter.World.remove(engine.world, particle);
      }
    });
  }, 500);
};

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

  useGeneratedParticles(
    engine,
    position,
    angle,
    velocity,
    concentration,
    airFriction,
    angularVelocity,
    enableCollisions,
    volatility,
    spread
  );
  useParticleCleanup(engine);

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
