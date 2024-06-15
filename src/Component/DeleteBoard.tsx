import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
`;

const Container = styled.div`
  width: 300px;
  height: auto;
`;

const DeleteBoard = () => {
  return (
    <Droppable droppableId="TRASH" type="TRASH">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <StyledFontAwesomeIcon icon={faTrashAlt} />
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default DeleteBoard;
