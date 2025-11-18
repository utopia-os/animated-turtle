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

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '720px',
        height: '520px',
        transform: `scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      {/* Left Fin - animated (behind body) */}
      <motion.img
        style={{
          position: 'absolute',
          left: '480px',
          top: '310px',
          width: '140px',
          transformOrigin: '50px 40px'
        }}
        src={turtleImages.flipperLeft}
        alt="Left fin"
        animate={{
          rotate: [-40, -50, -40],
        }}
        transition={{
          duration: finDuration,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Body - static (middle layer) */}
      <img
        style={{
          position: 'absolute',
          left: '40px',
          top: '40px',
          width: '620px'
        }}
        src={turtleImages.body}
        alt="Body"
      />

      {/* Back Fin - animated */}
      <motion.img
        style={{
          position: 'absolute',
          left: '0px',
          top: '500px',
          width: '200px',
          transformOrigin: '180px 0px'
        }}
        src={turtleImages.flipperBack}
        alt="Back fin"
        animate={{
          rotate: [-3, 4, -3],
        }}
        transition={{
          duration: finDuration,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Right Fin - animated (in front of body) */}
      <motion.img
        style={{
          position: 'absolute',
          left: '200px',
          top: '365px',
          width: '230px',
          transformOrigin: '200px 30px'
        }}
        src={turtleImages.flipperRight}
        alt="Right fin"
        animate={{
          rotate: [7, -9, 7],
        }}
        transition={{
          duration: finDuration,
          delay: 0.2,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Head - animated (on top) */}
      <motion.img
        style={{
          position: 'absolute',
          left: '420px',
          top: '25px',
          width: '250px',
          transformOrigin: '40px 190px'
        }}
        src={turtleImages.head}
        alt="Head"
        animate={{
          rotate: [-3, 0, -3],
          translateY: [0, -2, 0],
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
