import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import img1 from './img/KakaoTalk_Photo_2024-06-23-15-27-49 001.jpeg';
import img2 from './img/KakaoTalk_Photo_2024-06-23-15-27-49 002.jpeg';
import img3 from './img/KakaoTalk_Photo_2024-06-23-15-27-49 003.jpeg';
import img4 from './img/KakaoTalk_Photo_2024-06-23-15-27-50 004.jpeg';
import img5 from './img/KakaoTalk_Photo_2024-06-23-15-27-50 005.jpeg';
import img6 from './img/KakaoTalk_Photo_2024-06-23-15-27-50 006.jpeg';

const Wrapper = styled.div`
  font-family: 'Hi Melody', sans-serif;
  width: 100vw;
  height: 100vh;
  background-color: lightpink;
  display: flex;
  flex-direction: column; /* 세로 방향으로 요소들을 정렬합니다. */
  justify-content: space-between;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid lightpink;
  margin: 30px 0;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 20px;
`;

const imgList = [img1, img2, img3, img4, img5, img6];

const box = {
  start: (back: boolean) => ({ x: back ? -800 : 800, opacity: 0, scale: 0 }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  end: (back: boolean) => ({ x: back ? 800 : -800, opacity: 0, scale: 0 }),
};

const App = () => {
  const [visiable, setVisiable] = useState(0);
  const [back, setBack] = useState(false);

  const nextBtn = () => {
    setVisiable((prev) => (prev === imgList.length - 1 ? 0 : prev + 1));
    setBack(false);
  };

  const prevBtn = () => {
    setVisiable((prev) => (prev === 0 ? imgList.length - 1 : prev - 1));
    setBack(true);
  };
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          custom={back}
          variants={box}
          initial="start"
          animate="center"
          exit="end"
          key={visiable}
        >
          <Image src={imgList[visiable]} alt={`Image ${visiable + 1}`} />
        </Box>
      </AnimatePresence>
      <div>
        <Button onClick={nextBtn}>Next</Button>
        <Button onClick={prevBtn}>Prev</Button>
      </div>
    </Wrapper>
  );
};

export default App;
