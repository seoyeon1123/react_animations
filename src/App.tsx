import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const App = () => {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);

  useEffect(() => {
    scale.onChange(() => console.log(scale.get()));
  });

  return (
    <>
      <Wrapper>
        <Box style={{ x, scale: scale }} drag="x" dragSnapToOrigin />
      </Wrapper>
      ;
    </>
  );
};

export default App;
