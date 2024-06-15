import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardTodos = styled.div<ICardTodosProps>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDragging ? '#FFDE95' : props.theme.cardColor};
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;
`;

interface ICardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface ICardTodosProps {
  isDragging: boolean;
}
const Card = ({ toDoText, toDoId, index }: ICardProps) => {
  return (
    <>
      <Draggable key={toDoId} draggableId={toDoId + ''} index={index}>
        {(magic, info) => (
          <CardTodos
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
            isDragging={info.isDragging}
          >
            {toDoText}
          </CardTodos>
        )}
      </Draggable>
    </>
  );
};

export default Card;
