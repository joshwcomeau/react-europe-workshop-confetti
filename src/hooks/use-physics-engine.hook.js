import React from 'react';
import Matter from 'matter-js';

let engine, renderer;

export default function usePhysicsEngine(ref) {
  const [hasReceivedRef, setHasReceivedRef] = React.useState(null);
  React.useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    if (!engine) {
      // create an engine
      engine = Matter.Engine.create();

      // create a renderer
      const renderer = Matter.Render.create({
        canvas: ref.current,
        engine,
        options: {
          width: ref.current.width,
          height: ref.current.height,
          wireframes: false,
          background: 'transparent',
        },
      });

      Matter.Engine.run(engine);
      Matter.Render.run(renderer);
    }

    setHasReceivedRef(true);
  }, [ref]);

  return [engine];
}
