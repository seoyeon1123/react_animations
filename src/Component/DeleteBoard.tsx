import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
  width: 80px;
  height: 80px;
  /* Set relative positioning */
  position: fixed; /* Set fixed positioning */
  right: 20px; /* Distance from the right edge of the viewport */
  bottom: 20px; /* Distance from the bottom edge of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 80px; /* Adjust size as needed */
  color: ${(props) => props.theme.trash}; /* Change icon color */
  position: fixed;
`;

const DeleteBoard = () => {
  return (
    <Droppable droppableId="TRASH">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <IconWrapper>
            <FontAwesomeIcon icon={faTrashCan} />
          </IconWrapper>
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default DeleteBoard;
