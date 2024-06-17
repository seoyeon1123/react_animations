import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import styled from 'styled-components';

const Input = styled.input`
  border-style: none;
  background-color: ${(props) => props.theme.cardColor};
  border-bottom: 1px solid ${(props) => props.theme.boardColor};

  &:focus {
    outline: none;
  }
`;

interface IModal {
  toDoText: string;
  toDoId: number;
  boardId: string;
  onClose: () => void;
}

const Modal = ({ toDoText, toDoId, boardId, onClose }: IModal) => {
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
      <div>
        <title>수정할 내용을 입력하세요</title>
        <form onSubmit={onSubmit}>
          <Input type="text" value={inputValue} onChange={onChange} />
        </form>
      </div>
    </>
  );
};

export default Modal;
