import { useSetRecoilState } from 'recoil';
import { ITodo, toDoState } from './atoms';

const ToDo = ({ text, category }: ITodo) => {
  const setTodos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('I wanna to', event.currentTarget.name);
  };
  return (
    <>
      <li>
        <span>{text} </span>
        {category !== 'DOING' && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
          //인자를 넘기기 위해 익명함수 사용
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
