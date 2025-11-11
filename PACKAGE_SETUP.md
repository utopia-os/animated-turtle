# Turtle Component - Package Setup Guide

## ✅ Optimierungen durchgeführt

### 1. Tailwind CSS (ohne Prefix)
- Alle inline styles wurden zu Tailwind-Klassen konvertiert
- Verwendet Standard-Tailwind-Klassen **ohne** Prefix
- Funktioniert in allen Projekten (Maluhia, Utopia-Map, etc.)
- Einfacher zu überschreiben und wartungsfreundlicher

### 2. Flexible Konfiguration via Props
```tsx
interface TurtleProps {
  className?: string;           // Zusätzliche CSS-Klassen
  scale?: number;               // Größenskalierung (z.B. 0.5 = 50%)
  images?: {                    // Eigene Bildpfade
    body?: string;
    head?: string;
    flipperLeft?: string;
    flipperRight?: string;
    flipperBack?: string;
  };
  animationSpeed?: number;      // Animation schneller/langsamer (default: 1)
}
```

### 3. Verwendungsbeispiele

#### Standard (mit lokalen Bildern)
```tsx
<Turtle />
```

#### Mit eigenen Bildern
```tsx
<Turtle
  images={{
    body: '/assets/my-turtle-body.png',
    head: '/assets/my-turtle-head.png',
    flipperLeft: '/assets/my-turtle-left.png',
    flipperRight: '/assets/my-turtle-right.png',
    flipperBack: '/assets/my-turtle-back.png',
  }}
/>
```

#### Skaliert und beschleunigt
```tsx
<Turtle
  scale={0.5}              // Halbe Größe
  animationSpeed={2}       // Doppelt so schnell
  className="opacity-80"   // Standard Tailwind ohne Prefix
/>
```

## 📦 Package Konfiguration für npm

### package.json anpassen

```json
{
  "name": "@your-org/turtle-animation",
  "version": "1.0.0",
  "description": "Animated turtle component for React with Tailwind CSS",
  "private": false,
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsc && vite build",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "framer-motion": "^12.0.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "tailwindcss": "^4.1.17",
    "typescript": "^5.6.2",
    "vite": "^5.4.10"
  },
  "keywords": [
    "react",
    "turtle",
    "animation",
    "tailwind",
    "framer-motion",
    "component"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/turtle-animation"
  },
  "license": "MIT"
}
```

### tsconfig.json für Library Build

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### vite.config.ts für Library Build

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TurtleAnimation',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion'
        }
      }
    }
  }
});
```

### src/index.ts erstellen

```ts
export { Turtle } from './Turtle';
export type { TurtleProps } from './Turtle';
```

## 🎨 Tailwind Konfiguration für Consumer

### Der Consumer muss in seiner `tailwind.config.js`:

```js
module.exports = {
  // KEIN prefix nötig - Komponente verwendet Standard-Tailwind
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@your-org/turtle-animation/dist/**/*.js'  // Dein Package
  ],
  // ... rest
}
```

**Hinweis für Projekte mit Prefix:**
Wenn dein Projekt einen Prefix verwendet (z.B. `tw:`), musst du die Komponente wrappen oder die className-Prop verwenden, um Prefix-spezifische Klassen hinzuzufügen.

## 📝 Wichtige Hinweise

### 1. Image Assets
Die Turtle-Komponente erwartet folgende Bilder im selben Verzeichnis:
- `turtle_body.png`
- `turtle_head.png`
- `turtle_flipper_left.png`
- `turtle_flipper_right.png`
- `turtle_flipper_back.png`

**Optionen für Consumer:**
1. Bilder ins `public/` Verzeichnis legen
2. Eigene Pfade via `images` prop übergeben
3. Als Base64 einbetten (erhöht Bundle-Size)

### 2. Peer Dependencies
Consumer müssen selbst installieren:
```bash
npm install react react-dom framer-motion tailwindcss
```

### 3. Bundle Size Optimierung
- Framer Motion ist relativ groß (~50KB)
- Tailwind CSS wird nur Tree-Shaken wenn Consumer Tailwind nutzt
- Bilder sollten optimiert sein (WebP, komprimiert)

## 🚀 Veröffentlichung

```bash
# 1. Build erstellen
npm run build

# 2. Test lokal (optional)
npm pack
npm install ./turtle-animation-1.0.0.tgz -D

# 3. Auf npm veröffentlichen
npm login
npm publish --access public
```

## 📖 README für Package erstellen

Erstelle eine `README.md` mit:
- Installation instructions
- Usage examples
- Props documentation
- Image requirements
- Tailwind setup instructions
- Live demo (CodeSandbox/StackBlitz)

## ✨ Weitere Verbesserungen (Optional)

1. **Storybook** für Dokumentation
2. **Unit Tests** mit Vitest
3. **ESLint Config** für Code Quality
4. **Prettier** für Code Formatting
5. **GitHub Actions** für automatische Releases
6. **Changeset** für Version Management
