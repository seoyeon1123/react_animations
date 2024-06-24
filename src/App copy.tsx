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
  flex-direction: row;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 50vw;
  gap: 10px;

  div:first-child,
  div:last-child {
    grid-column: span 3;
  }
`;

const App = () => {
  const [num, setNum] = useState<null | number>(null);
  return (
    <>
      <Wrapper>
        <Grid>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <Box key={n} onClick={() => setNum(n)} layoutId={n + ''} />
          ))}
        </Grid>

        <AnimatePresence>
          {num ? (
            <Overlay
              onClick={() => setNum(null)}
              initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
              animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
            >
              <Box style={{ width: 400, height: 200 }} layoutId={num + ''} />
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
};

export default App;
