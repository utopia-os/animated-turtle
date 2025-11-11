import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export interface FishProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Fish color (CSS color value, default: '#FF6B35') */
  color?: string;
  /** Size in pixels (default: 60) */
  size?: number;
  /** Animation speed multiplier (default: 1, higher = faster) */
  animationSpeed?: number;
  /** Swimming direction: 'left' or 'right' (default: 'right') */
  direction?: 'left' | 'right';
  /** Custom image path (if provided, will use image instead of SVG) */
  image?: string;
  /** If true, fish swims across the entire screen horizontally (default: false) */
  swimAcrossScreen?: boolean;
  /** Starting Y position when swimAcrossScreen is true (percentage, default: 50) */
  yPosition?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
}

export const Fish = ({
  className = '',
  color = '#FF6B35',
  size = 60,
  animationSpeed = 1,
  direction = 'right',
  image,
  swimAcrossScreen = false,
  yPosition = 50,
  delay = 0,
}: FishProps) => {
  const swimDuration = 3 / animationSpeed;
  const tailDuration = 0.8 / animationSpeed;
  const crossScreenDuration = 15 / animationSpeed;

  const scaleX = direction === 'left' ? -1 : 1;

  // Dynamic screen width detection for responsive off-screen positioning
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate off-screen positions based on actual screen width
  const offset = size + 50;
  const offScreenRight = screenWidth + offset;
  const startX = direction === 'right' ? -offset : offScreenRight;
  const endX = direction === 'right' ? offScreenRight : -offset;

  // If custom image is provided, use it
  if (image) {
    return (
      <motion.div
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: swimAcrossScreen ? 'fixed' : 'relative',
          ...(swimAcrossScreen && {
            top: `${yPosition}%`,
          }),
        }}
        initial={
          swimAcrossScreen
            ? {
                left: startX,
                y: 0,
              }
            : false
        }
        animate={
          swimAcrossScreen
            ? {
                left: endX,
                y: [0, -15, 0, 15, 0],
              }
            : {
                y: [0, -10, 0],
              }
        }
        transition={
          swimAcrossScreen
            ? {
                left: {
                  duration: crossScreenDuration,
                  ease: 'linear',
                  repeat: Infinity,
                  delay: delay,
                },
                y: {
                  duration: swimDuration,
                  ease: 'easeInOut',
                  repeat: Infinity,
                },
              }
            : {
                duration: swimDuration,
                ease: 'easeInOut',
                repeat: Infinity,
              }
        }
      >
        <motion.img
          src={image}
          alt="Fish"
          style={{
            width: '100%',
            height: '100%',
            transform: `scaleX(${scaleX})`,
          }}
          animate={{
            rotate: [0, -3, 0, 3, 0],
          }}
          transition={{
            duration: tailDuration,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      </motion.div>
    );
  }

  // SVG-based fish (default)
  return (
    <motion.div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size * 0.6}px`,
        position: swimAcrossScreen ? 'fixed' : 'relative',
        ...(swimAcrossScreen && {
          top: `${yPosition}%`,
        }),
      }}
      initial={
        swimAcrossScreen
          ? {
              left: startX,
              y: 0,
            }
          : false
      }
      animate={
        swimAcrossScreen
          ? {
              left: endX,
              y: [0, -15, 0, 15, 0],
            }
          : {
              y: [0, -10, 0],
            }
      }
      transition={
        swimAcrossScreen
          ? {
              left: {
                duration: crossScreenDuration,
                ease: 'linear',
                repeat: Infinity,
                delay: delay,
              },
              y: {
                duration: swimDuration,
                ease: 'easeInOut',
                repeat: Infinity,
              },
            }
          : {
              duration: swimDuration,
              ease: 'easeInOut',
              repeat: Infinity,
            }
      }
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 60"
        style={{ transform: `scaleX(${scaleX})` }}
      >
        {/* Fish Body */}
        <motion.ellipse
          cx="50"
          cy="30"
          rx="30"
          ry="18"
          fill={color}
          animate={{
            rx: [30, 32, 30],
          }}
          transition={{
            duration: tailDuration,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />

        {/* Tail */}
        <motion.path
          d="M 20 30 L 0 20 L 5 30 L 0 40 Z"
          fill={color}
          opacity={0.8}
          animate={{
            d: [
              'M 20 30 L 0 20 L 5 30 L 0 40 Z',
              'M 20 30 L 0 25 L 5 30 L 0 35 Z',
              'M 20 30 L 0 20 L 5 30 L 0 40 Z',
            ],
          }}
          transition={{
            duration: tailDuration,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />

        {/* Top Fin */}
        <motion.path
          d="M 55 12 L 60 0 L 65 12 Z"
          fill={color}
          opacity={0.7}
          animate={{
            d: [
              'M 55 12 L 60 0 L 65 12 Z',
              'M 55 12 L 62 2 L 65 12 Z',
              'M 55 12 L 60 0 L 65 12 Z',
            ],
          }}
          transition={{
            duration: tailDuration * 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />

        {/* Eye */}
        <circle cx="65" cy="25" r="4" fill="white" />
        <circle cx="67" cy="24" r="2" fill="black" />

        {/* Scales detail */}
        <circle cx="45" cy="30" r="3" fill="white" opacity={0.3} />
        <circle cx="55" cy="35" r="2.5" fill="white" opacity={0.3} />
      </svg>
    </motion.div>
  );
};
