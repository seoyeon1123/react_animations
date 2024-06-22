import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import 표원식Image from './표원식.jpeg'; // 이미지 파일 경로를 import

const Wrapper = styled.div`
  font-family: 'Hi Melody', sans-serif;
  width: 100vw;
  height: 100vh;
  background-color: lightpink;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Hi Melody', sans-serif;
`;

const Modal = styled(motion.div)`
  width: 400px;
  max-width: 90vw;
  max-height: 90vh;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const H2 = styled.h2`
  font-size: 20px;
  font-family: 'Hi Melody', sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  padding: 8px 16px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 20px;
`;

const ModalContainer = styled.div`
  position: absolute;
`;

const QuizContainer = styled.div`
  margin-top: 20px;
`;

const OptionButton = styled.button`
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #f66b82;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #feafbc;
  }
`;

const CorrectModal = styled(motion.div)`
  width: 250px;
  height: 100px;
  background-color: wheat;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; // Ensuring this is higher than other elements
  padding-top: 15%;
`;
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [correctOpen, setCorrectOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openModal = () => {
    setModalOpen(true);
    setQuizAnswered(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeCorrectModal = () => {
    setCorrectOpen(false);
  };

  const modalVariants = {
    start: { scale: 0, opacity: 0 },
    end: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, type: 'spring' },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.5, type: 'spring' },
    },
  };

  const correctVariants = {
    start: { opacity: 0 },
    end: { opacity: 1, transition: { duration: 0.5, type: 'spring' } },
    exit: { opacity: 0 },
  };

  const handleOptionClick = (isCorrect: boolean) => {
    setCorrectOpen(true);
    setMessage(
      isCorrect ? '정답! 우리는 천생연분~' : '땡!!!!!!!!!!! 우우우우우우'
    );
  };

  return (
    <Wrapper>
      <Button onClick={openModal}>Click Me</Button>

      <ModalContainer>
        {modalOpen && (
          <Modal
            variants={modalVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            <CloseButton onClick={closeModal}>닫기</CloseButton>
            <H2>💪🏻득근하자 </H2>
            <Image src={표원식Image} alt="표원식" />
            <QuizContainer>
              <h3>서연이가 먹고 싶은 음식은? </h3>
              <OptionButton onClick={() => handleOptionClick(true)}>
                떡볶이
              </OptionButton>
              <OptionButton onClick={() => handleOptionClick(false)}>
                곱창
              </OptionButton>
              <OptionButton onClick={() => handleOptionClick(false)}>
                면
              </OptionButton>
              <OptionButton onClick={() => handleOptionClick(false)}>
                베이글
              </OptionButton>
              {correctOpen && (
                <CorrectModal
                  variants={correctVariants}
                  initial="start"
                  animate="end"
                  exit="exit"
                >
                  {message}
                  <CloseButton onClick={closeCorrectModal}>닫기</CloseButton>
                </CorrectModal>
              )}
            </QuizContainer>
          </Modal>
        )}
      </ModalContainer>
    </Wrapper>
  );
};

export default App;
