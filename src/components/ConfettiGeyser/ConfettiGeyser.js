import React from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';

import usePhysicsEngine from '../../hooks/use-physics-engine.hook';

const ConfettiGeyser = ({ duration, angle, position }) => {
  const canvasRef = React.useRef(null);

  const [engine, renderer] = usePhysicsEngine(canvasRef);

  React.useEffect(() => {
    const [top, left] = position;

    console.log('Effect!', engine, renderer);

    if (!engine) {
      return;
    }

    for (let i = 0; i < 20; i++) {
      const confettiPiece = Matter.Bodies.rectangle(top, left, 20, 20, {
        frictionAir: 0.04,
        collisionFilter: {
          category: null,
        },
      });

      Matter.Body.setVelocity(confettiPiece, {
        x: Math.random() * -10,
        y: Math.random() * -24 - 4,
      });

      Matter.Body.setAngularVelocity(confettiPiece, Math.random() * -0.6);

      Matter.World.add(engine.world, [confettiPiece]);
    }
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
