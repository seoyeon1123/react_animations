import { useSetRecoilState } from 'recoil';
import { ITodo, toDoState } from './atoms';

const ToDo = ({ text, id, category }: ITodo) => {
  const setTodos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as ITodo['category'] };

      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <>
      <li>
        <span>{text} </span>
        {category !== 'DOING' && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category !== 'TO_DO' && (
          <button name="TO_DO" onClick={onClick}>
            To Do
          </button>
        )}
        {category !== 'DONE' && (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        )}
      </li>
    </>
  );
};

export default ToDo;
