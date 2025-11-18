import { Turtle } from './src/Turtle';
import { Fish } from './src/Fish';
import { Bubbles } from './src/Bubbles';
import bg1 from './bg1.jpg';

function App() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: `url(${bg1})`,
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
        <Bubbles count={5} height={800} width={150} />
      </div>

      {/* Bubbles in the background - center left */}
      <div style={{ position: 'absolute', left: '20%', bottom: 0, zIndex: 1 }}>
        <Bubbles count={3} height={600} width={500} color="rgba(173, 216, 230, 0.5)" />
      </div>

      {/* Bubbles in the background - right side */}
      <div style={{ position: 'absolute', right: '5%', bottom: 0, zIndex: 1 }}>
        <Bubbles count={7} height={700} width={120} color="rgba(200, 230, 255, 0.6)" />
      </div>

      {/* Bubbles in the background - center right */}
      <div style={{ position: 'absolute', right: '20%', bottom: 0, zIndex: 1 }}>
        <Bubbles count={8} height={500} width={280} maxSize={12} />
      </div>

      {/* Turtle in the center */}
      <div style={{
        position: 'relative',
        zIndex: 2,
      }}>
        <Turtle scale={0.6} />
      </div>
    </div>
  );
}

export default App;
