import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSetRecoilState } from 'recoil';
import { toDoState, ITodo } from '../atoms';

const CardTodos = styled.div<ICardTodosProps>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDragging ? '#B7B597' : props.theme.cardColor};
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;
`;

interface ICardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string; // 보드 ID를 문자열로 변경
}

interface ICardTodosProps {
  isDragging: boolean;
}

const Card = ({ toDoText, toDoId, index, boardId }: ICardProps) => {
  const setTodos = useSetRecoilState(toDoState);

  const onClickEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    const newText = prompt('수정할 내용을 입력하세요', toDoText);
    if (newText !== null && newText.trim() !== '') {
      setTodos((allBoards) => {
        // 이전 상태(prevTodos)를 바탕으로 새로운 상태를 업데이트합니다.
        const updatedTodos = allBoards[boardId].map((todo) =>
          todo.id === toDoId ? { ...todo, text: newText } : todo
        );

        // 업데이트된 할 일 목록을 새로운 객체로 반환합니다.
        return {
          ...allBoards,
          [boardId]: updatedTodos,
        };
      });
    }
  };

  return (
    <Draggable key={toDoId} draggableId={toDoId.toString()} index={index}>
      {(magic, info) => (
        <CardTodos
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={info.isDragging}
        >
          {toDoText}
          <FontAwesomeIcon onClick={onClickEdit} icon={faPenToSquare} />
        </CardTodos>
      )}
    </Draggable>
  );
};

export default Card;
