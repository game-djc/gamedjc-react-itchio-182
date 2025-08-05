import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

import './App.css'

function App() {
  const [npcPos, setNpcPos] = useState<Position>({ x: 0, y: 200 });
  const direction = useRef<number>(1);  // 1: derecha, -1: izquierda
  const requestRef = useRef<number | null>(null);

  const animate = () => {
    setNpcPos((pos) => {
      let newX = pos.x + 2 * direction.current;

      // Cambiar de dirección si choca con los bordes
      if (newX >= 350) direction.current = -1;
      if (newX <= 0) direction.current = 1;

      return { ...pos, x: newX };
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      <div>
        <h1>Game</h1>
        <svg width="400" height="400" style={{ border: '1px solid black' }}>
          <rect x="0" y="0" width="400" height="400" fill="#000" />
          <image href="/player.png" x={npcPos.x} y={npcPos.y} width="32" height="32" />
        </svg>
      </div>
    </>
  )
}

export default App
