import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? '#F28585' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0,0,0,0.5)' : 'none'};
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 7px;
`;

interface IDragbbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DragabbleCard = ({ toDoId, toDoText, index }: IDragbbleCardProps) => {
  console.log(toDoId, 'is rerendering');
  return (
    <>
      <Draggable key={toDoId} draggableId={toDoId + ''} index={index}>
        {(magic, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
          >
            {toDoText}
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default React.memo(DragabbleCard);
//react에게 prop이 변하지 않았다면, DraggbleCard를 다시 렌더링 하지 말라고 이야기 해줌 -> memo
//memo --> prop가 변한 item만 다시 렌더링 함
