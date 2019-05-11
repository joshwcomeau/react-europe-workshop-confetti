import React from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';

import usePhysicsEngine from '../../hooks/use-physics-engine.hook';
import { sample, normalize, random, throttle } from '../../utils';

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

  // The number, in milliseconds, for the geyser to run for.
  duration,

  // The rate of particles fired, specified as # per second
  // 4: slow
  // 15: moderate
  // 30: intense
  concentration,

  // An array of image paths to use for sprites
  // max size per sprite: 20x20
  sprites = DEFAULT_SPRITES,
}) => {
  const canvasRef = React.useRef(null);

  const [engine] = usePhysicsEngine(canvasRef);

  React.useEffect(() => {
    let mousePosition = null;
    let lastMoveAt = null;

    const handleMouseMove = throttle(event => {
      const { clientX, clientY } = event;
      const newMousePosition = [clientX, clientY];
      const newMoveAt = performance.now();

      // If this is our very first recorded move, just record this timestamp for
      // the next one
      if (!lastMoveAt) {
        lastMoveAt = newMoveAt;
        mousePosition = newMousePosition;

        return;
      }

      const deltaX = newMousePosition[0] - mousePosition[0];
      const deltaY = newMousePosition[1] - mousePosition[1];

      const deltaTime = newMoveAt - lastMoveAt;

      const xPerSecond = (deltaX * 1000) / deltaTime;
      const yPerSecond = (deltaY * 1000) / deltaTime;

      lastMoveAt = newMoveAt;
      mousePosition = newMousePosition;

      Matter.Composite.allBodies(engine.world).forEach(body => {
        const aSquared = Math.pow(clientX - body.position.x, 2);
        const bSquared = Math.pow(clientY - body.position.y, 2);
        const distanceToMouse = Math.sqrt(aSquared + bSquared);

        const dampening = (1 / distanceToMouse) * 0.1;

        Matter.Body.setVelocity(body, {
          x: body.velocity.x + xPerSecond * dampening,
          y: body.velocity.y + yPerSecond * dampening,
        });
      });
    }, 80);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [engine]);

  React.useEffect(() => {
    const [top, left] = position;

    if (!engine) {
      return;
    }

    // how many ms needs to pass between each frame?
    const timePerFrame = 1000 / concentration;

    const startAt = performance.now();

    let intervalId = window.setInterval(() => {
      if (performance.now() - startAt > duration) {
        window.clearInterval(intervalId);
        return;
      }

      const sprite = sample(sprites);

      let confettiSettings = {
        frictionAir: airFriction,
        render: {
          sprite: {
            texture: sprite.src,
            xScale: 1,
            yScale: 1,
          },
        },
      };

      console.log({ enableCollisions });

      if (!enableCollisions) {
        confettiSettings.collisionFilter = {
          category: null,
        };
      }

      const confettiPiece = Matter.Bodies.rectangle(
        top,
        left,
        sprite.width,
        sprite.height,
        confettiSettings
      );

      const spreadPercentile = Math.random();
      const velocityPercentile = Math.random();

      const imperfectAngle = normalize(
        spreadPercentile,
        0,
        1,
        angle - spread / 2,
        angle + spread / 2
      );

      let imperfectVelocity = normalize(
        velocityPercentile,
        0,
        1,
        velocity - velocity * volatility,
        velocity + velocity * volatility
      );

      const angleInRads = convertDegreesToRadians(imperfectAngle);

      const x = Math.cos(angleInRads) * imperfectVelocity;
      const y = Math.sin(angleInRads) * imperfectVelocity;

      Matter.Body.setVelocity(confettiPiece, {
        x,
        y,
      });

      const imperfectAngularVelocity = angularVelocity * velocityPercentile;

      Matter.Body.setAngularVelocity(confettiPiece, imperfectAngularVelocity);

      Matter.World.add(engine.world, [confettiPiece]);
    }, timePerFrame);

    return () => {
      window.clearInterval(intervalId);
    };
  });

  React.useEffect(() => {
    const BUFFER = 100;

    const intervalId = window.setInterval(() => {
      Matter.Composite.allBodies(engine.world).forEach(body => {
        if (body.position.y > window.innerHeight + BUFFER) {
          Matter.World.remove(engine.world, body);
        }
      });
    }, 500);

    return () => {
      window.clearInterval(intervalId);
    };
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
