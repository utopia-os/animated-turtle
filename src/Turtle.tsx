import { motion } from 'framer-motion';
import turtleBodyImg from './assets/turtle_body.png';
import turtleHeadImg from './assets/turtle_head.png';
import turtleFlipperLeftImg from './assets/turtle_flipper_left.png';
import turtleFlipperRightImg from './assets/turtle_flipper_right.png';
import turtleFlipperBackImg from './assets/turtle_flipper_back.png';

export interface TurtleProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Base size multiplier for responsive scaling (default: 1) */
  scale?: number;
  /** Custom image paths for turtle parts */
  images?: {
    body?: string;
    head?: string;
    flipperLeft?: string;
    flipperRight?: string;
    flipperBack?: string;
  };
  /** Animation speed multiplier (default: 1, higher = faster) */
  animationSpeed?: number;
}

const DEFAULT_IMAGES = {
  body: turtleBodyImg,
  head: turtleHeadImg,
  flipperLeft: turtleFlipperLeftImg,
  flipperRight: turtleFlipperRightImg,
  flipperBack: turtleFlipperBackImg,
};

export const Turtle = ({
  className = '',
  scale = 1,
  images = {},
  animationSpeed = 1,
}: TurtleProps) => {
  const turtleImages = { ...DEFAULT_IMAGES, ...images };

  // Calculate durations based on animation speed
  const headDuration = 5 / animationSpeed;
  const finDuration = 3.2 / animationSpeed;
  const backFinDuration = 2.9 / animationSpeed;

  return (
    <div
      className={`relative w-[720px] h-[520px] ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      {/* Left Fin - animated (behind body) */}
      <motion.img
        className="absolute left-[490px] top-[300px] w-[140px]"
        style={{
          transformOrigin: '30px 30px'
        }}
        src={turtleImages.flipperLeft}
        alt="Left fin"
        animate={{
          rotate: [-35, -30, -35],
        }}
        transition={{
          duration: finDuration,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Body - static (middle layer) */}
      <img
        className="absolute left-[40px] top-[40px] w-[620px]"
        src={turtleImages.body}
        alt="Body"
      />

      {/* Back Fin - animated */}
      <motion.img
        className="absolute left-0 top-[495px] w-[200px]"
        style={{
          transformOrigin: '200px 10px'
        }}
        src={turtleImages.flipperBack}
        alt="Back fin"
        animate={{
          rotate: [-6, 0, -6],
        }}
        transition={{
          duration: backFinDuration,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Right Fin - animated (in front of body) */}
      <motion.img
        className="absolute left-[200px] top-[365px] w-[230px]"
        style={{
          transformOrigin: '200px 25px'
        }}
        src={turtleImages.flipperRight}
        alt="Right fin"
        animate={{
          rotate: [2, -3, 2],
        }}
        transition={{
          duration: finDuration,
          delay: 0.7,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Head - animated (on top) */}
      <motion.img
        className="absolute left-[420px] top-[45px] w-[230px]"
        style={{
          transformOrigin: '40px 190px'
        }}
        src={turtleImages.head}
        alt="Head"
        animate={{
          rotate: [1, 5, 1],
          translateY: [0, -4, 0],
        }}
        transition={{
          duration: headDuration,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
    </div>
  );
};
