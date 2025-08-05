import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

function App() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 20, y: 20 });
  const playerPosRef = useRef<Position>({ x: 20, y: 20 });
  const playerTargetRef = useRef<Position>({ x: 20, y: 20 });
  const npcPosRef = useRef<Position>({ x: 0, y: 200 });
  const [npcPos, setNpcPos] = useState<Position>({ x: 0, y: 200 });

  const direction = useRef<number>(1);
  const requestRef = useRef<number>(0);
  const speed = 2;

  const animate = () => {
    npcPosRef.current.x += 2 * direction.current;
    if (npcPosRef.current.x >= 350) direction.current = -1;
    if (npcPosRef.current.x <= 0) direction.current = 1;
    setNpcPos({ ...npcPosRef.current });

    const dx = playerTargetRef.current.x - playerPosRef.current.x;
    const dy = playerTargetRef.current.y - playerPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      const dirX = dx / distance;
      const dirY = dy / distance;
      playerPosRef.current.x += dirX * speed;
      playerPosRef.current.y += dirY * speed;

      setPlayerPos({ ...playerPosRef.current });
    }

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

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    playerTargetRef.current = { x, y };
  };

  return (
    <>
      <div>
        <h1>Game</h1>
        <svg
          width="400"
          height="400"
          style={{ border: '1px solid black' }}
          onClick={handleClick}
        >
          <rect x="0" y="0" width="400" height="400" fill="#000" />
          <image href="/player.png" x={playerPos.x} y={playerPos.y} width="32" height="32" />
          <image href="/Idle.png" x={npcPos.x} y={npcPos.y} width="32" height="32" />
        </svg>
      </div>
    </>
  );
}

export default App
