import { useSetRecoilState } from 'recoil';
import { Categoryies, ITodo, toDoState } from './atoms';

const ToDo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setTodos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onClickDelete = () => {
    setTodos((oldToDos) => oldToDos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <li>
        <span>{text} </span>
        {category !== Categoryies.DOING && (
          <button name={Categoryies.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Categoryies.TO_DO && (
          <button name={Categoryies.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Categoryies.DONE && (
          <button name={Categoryies.DONE} onClick={onClick}>
            Done
          </button>
        )}
        <button onClick={onClickDelete}>Delete</button>
      </li>
    </>
  );
};

export default ToDo;
