import React from 'react';
import Matter from 'matter-js';

export default function usePhysicsEngine(ref) {
  let [engine, setEngine] = React.useState(null);
  let [renderer, setRenderer] = React.useState(null);

  React.useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    // create an engine
    const engine = Matter.Engine.create();

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

    setEngine(engine);
    setRenderer(renderer);
  }, [ref]);

  return [engine, renderer];
}
