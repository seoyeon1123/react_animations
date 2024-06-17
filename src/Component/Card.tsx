import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import Modal from './Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
    setIsIconVisible(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsIconVisible(true);
  };

  const onClickEdit = (e: React.MouseEvent) => {
    e.preventDefault();

    openModal();
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

          {/* <FontAwesomeIcon onClick={onClickEdit} icon={faPenToSquare} /> */}
          {isIconVisible && (
            <FontAwesomeIcon icon={faPenToSquare} onClick={onClickEdit} />
          )}
          {isModalOpen && (
            <Modal
              toDoText={toDoText}
              toDoId={toDoId}
              index={index}
              boardId={boardId}
              onClose={closeModal}
            />
          )}
        </CardTodos>
      )}
    </Draggable>
  );
};

export default Card;
