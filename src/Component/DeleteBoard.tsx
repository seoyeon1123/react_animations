import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import ModalAllDelete from './ModalAllDelete';

const Container = styled.div`
  width: 80px;
  height: 80px;
  position: fixed;
  right: 10px;
  bottom: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  margin-bottom: 10px;
`;

const FontAwesomeIconAllDelete = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-bottom: 20px;

  &:active {
    font-size: 50px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 60px;
  color: ${(props) => props.theme.trash};
  position: fixed;
`;

const DeleteBoard = () => {
  const [isClearOpen, setClearOpen] = useState(false);
  const setTodos = useSetRecoilState(toDoState);

  const onClickClearAll = () => {
    setTodos((allBoards) => {
      const copyAllBoards = { ...allBoards };
      Object.keys(copyAllBoards).forEach((key) => delete copyAllBoards[key]);
      return copyAllBoards;
    });
    setClearOpen(false); // 모달 닫기
  };

  const openAllClear = () => {
    setClearOpen(true);
  };

  const closeAllClear = () => {
    setClearOpen(false);
  };

  const onClickClearBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    openAllClear();
  };

  return (
    <Droppable droppableId="TRASH">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <IconWrapper>
            <FontAwesomeIconStyled icon={faTrashCan} />
            <FontAwesomeIconAllDelete
              onClick={onClickClearBtn} // 모달 열기
              icon={faBroom}
            />
            {isClearOpen && (
              <ModalAllDelete
                onClose={closeAllClear}
                onConfirm={onClickClearAll}
              />
            )}
          </IconWrapper>
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default DeleteBoard;
