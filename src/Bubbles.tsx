import { motion } from 'framer-motion';
import { useMemo } from 'react';

export interface BubblesProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Number of bubbles to display (default: 10) */
  count?: number;
  /** Bubble color (CSS color value, default: 'rgba(255, 255, 255, 0.6)') */
  color?: string;
  /** Min bubble size in pixels (default: 5) */
  minSize?: number;
  /** Max bubble size in pixels (default: 20) */
  maxSize?: number;
  /** Animation speed multiplier (default: 1, higher = faster) */
  animationSpeed?: number;
  /** Container width in pixels (default: 300) */
  width?: number;
  /** Container height in pixels (default: 400) */
  height?: number;
}

interface Bubble {
  id: number;
  size: number;
  startX: number;
  delay: number;
  duration: number;
  wobbleAmount: number;
}

export const Bubbles = ({
  className = '',
  count = 10,
  color = 'rgba(255, 255, 255, 0.6)',
  minSize = 5,
  maxSize = 20,
  animationSpeed = 1,
  width = 300,
  height = 400,
}: BubblesProps) => {
  // Generate random bubbles with memoization to prevent re-rendering
  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: minSize + Math.random() * (maxSize - minSize),
      startX: Math.random() * width,
      delay: Math.random() * 2,
      duration: (3 + Math.random() * 2) / animationSpeed,
      wobbleAmount: 20 + Math.random() * 30,
    }));
  }, [count, minSize, maxSize, width, animationSpeed]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'absolute',
            bottom: -bubble.size,
            left: bubble.startX,
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${color}, rgba(255, 255, 255, 0.1))`,
            border: `1px solid rgba(255, 255, 255, 0.3)`,
            boxShadow: 'inset -2px -2px 4px rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            y: [0, -height - bubble.size],
            x: [
              0,
              Math.sin(bubble.id) * bubble.wobbleAmount,
              -Math.cos(bubble.id) * bubble.wobbleAmount,
              0,
            ],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0, 1, 1, 0.5, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        />
      ))}
    </div>
  );
};
