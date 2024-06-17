import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  right: 20px;
  bottom: 80px;
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.cardColor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 300px; /* 최소 너비 설정 */
  min-height: 100px; /* 최소 높이 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.boardColor};
  margin-left: 10px;
  color: ${(props) => props.theme.boardtextColor};
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.boardColor};
  font-size: 15px;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer; /* 포인터 커서 추가 */
`;

interface IModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ModalAllDelete = ({ onClose, onConfirm }: IModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose(); // 모달 닫기
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to delete everything?</p>
        <Button onClick={handleConfirm}>OK</Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ModalAllDelete;
