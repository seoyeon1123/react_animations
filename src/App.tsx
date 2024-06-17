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

const Header = styled.header`
  height: 60px;
  width: 100%;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vh;
  position: relative;
`;

const CustomFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 50px;
  cursor: pointer;
  color: ${(props) => props.theme.toggle};
  margin: 0;
  z-index: 1;
  margin-left: 10px;
`;

const Boards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  font-family: 'Playwrite AU VIC', cursive;
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

  &::placeholder {
    font-family: 'Gowun Batang', serif;
  }
`;

interface IForm {
  addToDo: string;
}

const App = () => {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [isToggled, setIsToggled] = useRecoilState(isDarkAtom);

  const toggleTheme = () => {
    setIsToggled((prev) => !prev);
  };

  // const nowDate = Date.now();

  const onValid = ({ addToDo }: IForm) => {
    if (Object.keys(toDos).length >= 3) {
      return;
    }
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [addToDo]: [],
      };
    });
    setValue('addToDo', '');
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      console.log('보드 밖으로 떨어짐');
      return;
    }

    if (destination.droppableId === 'TRASH') {
      setTodos((allBoard) => {
        const copySource = [...allBoard[source.droppableId]];
        copySource.splice(source.index, 1);

        return {
          ...allBoard,
          [source.droppableId]: copySource,
        };
      });
      console.log('Trash로 이동함');
      return;
    }
    setTodos((allBoard) => {
      const sourceBoard = [...allBoard[source.droppableId]];
      const destinationBoard = [...allBoard[destination.droppableId]];

      if (source.droppableId === destination.droppableId) {
        const taskObj = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
        };
      } else {
        const taskObj = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      }
    });
    console.log('보드 이동 완료');
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Header>
          <CustomFontAwesomeIcon
            onClick={toggleTheme}
            icon={isToggled ? faToggleOn : faToggleOff}
          />
        </Header>

        <Wrapper>
          <FormInput>
            <Title>What To Do Today?</Title>
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
    </>
  );
};

export default React.memo(App);
