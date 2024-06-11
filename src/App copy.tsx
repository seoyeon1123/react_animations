import React, { DragEventHandler } from 'react';
import {
  DragDropContext,
  Draggable,
  DropReason,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';

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

const App = () => {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    setTodos((oldTodos) => {
      const copyTodos = [...oldTodos];
      copyTodos.splice(source.index, 1);
      copyTodos.splice(destination?.index, 0, draggableId);
      return oldTodos;
    });
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Borders>
            <Droppable droppableId={'one'}>
              {(magic) => (
                <Border ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((todo, index) => (
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
