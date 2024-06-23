import React, { useState } from 'react';
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
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const App = () => {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => {
    setClicked((prev) => !prev);
  };
  return (
    <>
      <Wrapper onClick={toggleClicked}>
        <Box
          style={{
            justifyContent: clicked ? 'center' : 'flex-start',
            alignItems: clicked ? 'center' : 'flex-start',
          }}
        >
          <Circle />
        </Box>
      </Wrapper>
    </>
  );
};

export default App;
