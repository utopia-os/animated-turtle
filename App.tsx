import { Turtle } from './src/Turtle';

function App() {
  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '100vh',
      backgroundImage: 'url(bg1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      margin: 0
    }}>
      <Turtle />
    </div>
  );
}

export default App;
