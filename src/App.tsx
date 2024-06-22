import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { motion, AnimatePresence } from 'framer-motion';

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

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const App = () => {
  const [showing, setShowing] = useState(false);

  const toggleShowing = () => {
    setShowing((prev) => !prev);
  };

  const boxVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1, rotateZ: 360 },
    leaving: { opacity: 0, scale: 0, y: 50 },
  };

  return (
    <>
      <Wrapper>
        <button onClick={toggleShowing}>Click Me</button>
        <AnimatePresence>
          {' '}
          {showing && (
            <Box
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="leaving"
            />
          )}
        </AnimatePresence>
      </Wrapper>
    </>
  );
};

export default App;
