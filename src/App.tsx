import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState, isDarkAtom } from './atoms';
import Board from './Component/Board';
import { useForm } from 'react-hook-form';
import DeleteBoard from './Component/DeleteBoard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vh;
`;

const CustomFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
`;

const Boards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 150px;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
`;

const Input = styled.input`
  width: 500px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;

interface IForm {
  addToDo: string;
}

const App = () => {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const [isToggled, setIsToggled] = useRecoilState(isDarkAtom);

  const toggleTheme = () => {
    setIsToggled((prev) => !prev);
  };

  const onValid = ({ addToDo }: IForm) => {
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [addToDo]: [],
      };
    });
    setValue('addToDo', '');
  };

  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination, type } = result;

    if (!destination) {
      // destination이 null인 경우 (보드 밖으로 떨어짐)
      console.log('보드 밖으로 떨어짐');
      return;
    }
    if (source.droppableId === destination.droppableId) {
      setTodos((allBoard) => {
        const copySource = [...allBoard[source.droppableId]];
        const taskObj = copySource[source.index];

        copySource.splice(source.index, 1);
        copySource.splice(destination.index, 0, taskObj);

        return {
          ...allBoard,
          [source.droppableId]: copySource,
        };
      });
      console.log('같은 보드에서 움직임');
    }

    if (source.droppableId !== destination.droppableId) {
      // setTodos((allBoard) => {
      //   const copySource = [...allBoard[source.droppableId]];
      //   const copyDestination = [...allBoard[destination.droppableId]];
      //   const taskObj = copySource[source.index];

      //   copySource.splice(source.index, 1);
      //   copyDestination.splice(destination.index, 0, taskObj);

      //   return {
      //     ...allBoard,
      //     [source.droppableId]: copySource,
      //     [destination.droppableId]: copyDestination,
      //   };
      // });
      console.log('다른 보드로 이동함');
    }

    // TRASH 영역으로 드롭된 경우의 처리 로직
    if (type === 'TRASH' && destination.droppableId === 'TRASH') {
      // setTodos((allBoard) => {
      //   const copySource = [...allBoard[source.droppableId]];
      //   copySource.splice(source.index, 1);

      //   return {
      //     ...allBoard,
      //     [source.droppableId]: copySource,
      //   };
      // });
      console.log('Trash로 이동함');
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CustomFontAwesomeIcon
        onClick={toggleTheme}
        icon={isToggled ? faToggleOn : faToggleOff}
      />
      <Wrapper>
        <FormInput>
          <Title>오늘의 할 일 ?</Title>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register('addToDo', {
                required: true,
              })}
              placeholder="Create New Board"
            />
          </form>
        </FormInput>

        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <DeleteBoard />
      </Wrapper>
    </DragDropContext>
  );
};

export default React.memo(App);
