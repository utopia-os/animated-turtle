# 🐢 Turtle Animation

Eine animierte React-Komponente einer Schildkröte, gebaut mit Framer Motion.

## Installation

```bash
npm install @your-username/turtle-animation
```

## Peer Dependencies

Stelle sicher, dass diese Dependencies in deinem Projekt installiert sind:

```bash
npm install react react-dom framer-motion
```

## Verwendung

### Einfaches Beispiel

```tsx
import { Turtle } from '@your-username/turtle-animation';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <Turtle />
    </div>
  );
}
```

### Mit eigenen Bildern

```tsx
import { Turtle } from '@your-username/turtle-animation';

function App() {
  return (
    <Turtle
      images={{
        body: '/path/to/custom-body.png',
        head: '/path/to/custom-head.png',
        flipperLeft: '/path/to/custom-left-fin.png',
        flipperRight: '/path/to/custom-right-fin.png',
        flipperBack: '/path/to/custom-back-fin.png',
      }}
    />
  );
}
```

### Anpassung der Animation

```tsx
import { Turtle } from '@your-username/turtle-animation';

function App() {
  return (
    <Turtle
      scale={0.5}              // Größe anpassen (0.5 = 50%)
      animationSpeed={2}       // Doppelt so schnell
      className="my-turtle"    // Eigene CSS-Klasse
    />
  );
}
```

## Props

| Prop | Typ | Default | Beschreibung |
|------|-----|---------|--------------|
| `className` | `string` | `''` | Zusätzliche CSS-Klassen für den Container |
| `scale` | `number` | `1` | Größen-Multiplikator (z.B. 0.5 für halbe Größe) |
| `animationSpeed` | `number` | `1` | Animationsgeschwindigkeit (höher = schneller) |
| `images` | `object` | Default-Bilder | Eigene Bildpfade für Schildkrötenteile |

### Images Object

```typescript
images?: {
  body?: string;
  head?: string;
  flipperLeft?: string;
  flipperRight?: string;
  flipperBack?: string;
}
```

## Technische Details

- **Größe**: Die Standard-Turtle hat eine Breite von 720px und Höhe von 520px (anpassbar mit `scale`)
- **Animationen**: Verwendet Framer Motion für flüssige, performante Animationen
- **TypeScript**: Vollständig typisiert mit TypeScript-Definitionen
- **React**: Kompatibel mit React 18+

## Development

```bash
# Installation
npm install

# Development Server starten
npm run dev

# Library bauen
npm run build:lib

# Vor Veröffentlichung
npm run prepublishOnly
```

## Lizenz

MIT

## Autor

Your Name
