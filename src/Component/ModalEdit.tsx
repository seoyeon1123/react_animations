import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed; /* 화면 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 배경 반투명 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소보다 위에 오도록 */
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.cardColor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  border-style: none;
  background-color: ${(props) => props.theme.cardColor};
  border-bottom: 1px solid ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.textColor};

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.boardColor};
  margin-left: 10px;
  color: ${(props) => props.theme.boardtextColor};
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.boardColor};
  font-size: 15px;
`;

interface IModal {
  toDoText: string;
  toDoId: number;
  boardId: string;
  onClose: () => void;
}

const ModalEdit = ({ toDoText, toDoId, boardId, onClose }: IModal) => {
  const [inputValue, setValue] = useState(toDoText);
  const setTodos = useSetRecoilState(toDoState);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodos = inputValue;
    if (newTodos !== null && newTodos.trim() !== '') {
      setTodos((allBoards) => {
        const updatedTodos = allBoards[boardId].map((todo) =>
          todo.id === toDoId ? { ...todo, text: newTodos } : todo
        );

        return {
          ...allBoards,
          [boardId]: updatedTodos,
        };
      });
      onClose();
      setValue('');
    }
  };

  return (
    <>
      <ModalWrapper onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <form onSubmit={onSubmit}>
            <Input type="text" value={inputValue} onChange={onChange} />
            <Button type="submit">확인</Button>
          </form>
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default ModalEdit;
