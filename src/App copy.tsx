import React, { DragEventHandler } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Borders = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;
const Border = styled.div`
  padding: 0px 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;
`;

const todos = ['표원식', '바보', '멍청이', '똥깨', '말미잘'];

const App = () => {
  const onDragEnd = () => {};
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Borders>
            <Droppable droppableId={'one'}>
              {(magic) => (
                <Border ref={magic.innerRef} {...magic.droppableProps}>
                  {todos.map((todo, index) => (
                    <Draggable draggableId={todo} index={index}>
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                          {...magic.dragHandleProps}
                        >
                          {todo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                </Border>
              )}
            </Droppable>
          </Borders>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default App;
