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
  index: number;
  boardId: string;
  onClose: () => void;
}

const Modal = ({ toDoText, toDoId, index, boardId, onClose }: IModal) => {
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
        // 이전 상태(prevTodos)를 바탕으로 새로운 상태를 업데이트합니다.
        const updatedTodos = allBoards[boardId].map((todo) =>
          todo.id === toDoId ? { ...todo, text: newTodos } : todo
        );

        // 업데이트된 할 일 목록을 새로운 객체로 반환합니다.
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
