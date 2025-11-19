import { Turtle } from './src/Turtle';
import { Fish } from './src/Fish';
import { Bubbles } from './src/Bubbles';
import bg from './bg2.png';
import { useState, useEffect } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const turtleScale = isMobile ? 0.4 : 0.6;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      margin: 0,
      overflow: 'hidden',
    }}>
      {/* Fish swimming across screen - background layer */}
      <Fish
        swimAcrossScreen
        direction="right"
        color="#4ECDC4"
        size={70}
        animationSpeed={1.2}
        yPosition={15}
        delay={0}
      />
      <Fish
        swimAcrossScreen
        direction="left"
        color="#FF6B35"
        size={60}
        animationSpeed={0.9}
        yPosition={35}
        delay={2}
      />
      <Fish
        swimAcrossScreen
        direction="right"
        color="#FFD93D"
        size={80}
        animationSpeed={0.7}
        yPosition={55}
        delay={4}
      />
      <Fish
        swimAcrossScreen
        direction="left"
        color="#95E1D3"
        size={65}
        animationSpeed={1.1}
        yPosition={75}
        delay={6}
      />
      <Fish
        swimAcrossScreen
        direction="right"
        color="#F38181"
        size={155}
        animationSpeed={1.3}
        yPosition={85}
        delay={8}
      />

      {/* Bubbles in the background - left side */}
      <div style={{ position: 'absolute', left: '5%', bottom: 0, zIndex: 1 }}>
        <Bubbles count={5} height={window.innerHeight} width={window.innerWidth} />
      </div>

      {/* Bubbles in the background - center left */}
      <div style={{ position: 'absolute', left: '20%', bottom: 0, zIndex: 1 }}>
        <Bubbles count={3} height={window.innerHeight} width={window.innerWidth} color="rgba(173, 216, 230, 0.5)" />
      </div>

      {/* Bubbles in the background - right side */}
      <div style={{ position: 'absolute', right: '5%', bottom: 0, zIndex: 1 }}>
        <Bubbles count={7} height={window.innerHeight} width={window.innerWidth} color="rgba(200, 230, 255, 0.6)" />
      </div>

      {/* Bubbles in the background - center right */}
      <div style={{ position: 'absolute', right: '20%', bottom: 0, zIndex: 1 }}>
        <Bubbles count={8} height={window.innerHeight} width={window.innerWidth} maxSize={12} />
      </div>

      {/* Turtle in the center */}
      <div style={{
        position: 'relative',
        zIndex: 2,
      }}>
        <Turtle scale={turtleScale} />
      </div>
    </div>
  );
}

export default App;
