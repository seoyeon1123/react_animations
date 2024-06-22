import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';

import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to top,
    rgb(255, 0, 64) 0%,
    rgb(255, 177, 153) 100%
  );
`;

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  stroke: white;
  stroke-width: 2;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  display: flex;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const App = () => {
  const x = useMotionValue(0);

  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const background = useTransform(
    x,
    [-800, 800],
    [
      `linear-gradient(rgb(185, 159, 255) 0%, rgb(190, 153, 255) 100%)`,
      `linear-gradient(to top, rgb(255, 68, 115) 0%, rgb(255, 177, 153) 100%)`,
    ]
  );

  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  const svg = {
    start: { pathLength: 0, fill: 'rgba(255,255,255,0)' },
    end: {
      pathLength: 1,
      fill: 'rgba(255,255,255,1)',
    },
  };

  return (
    <>
      <Wrapper style={{ background }}>
        {/* <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin /> */}

        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <motion.path
            initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
            animate={{
              pathLength: 1,
              fill: 'rgba(255,255,255,1)',
              rotateZ: 360,
            }}
            transition={{
              default: { duration: 5 },
              fill: { duration: 2, delay: 5 },
            }}
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          />
        </Svg>
      </Wrapper>
    </>
  );
};

export default App;
