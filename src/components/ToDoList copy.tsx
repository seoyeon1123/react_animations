import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';
import { text } from 'stream/consumers';

const toDoState = atom<ITodo[]>({
  key: 'toDo',
  default: [],
});

interface ITodo {
  text: string;
  category: 'TO_DO' | 'DOING' | 'DONE';
  id: number;
}

interface IForm {
  toDo: string;
}

const ToDoList = () => {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setValue('toDo', '');
    setTodos((oldTodos) => [
      { text: toDo, category: 'TO_DO', id: Date.now() },
      ...oldTodos,
    ]);
  };

  return (
    <>
      <div>
        <h1>To Dos</h1>
        <hr />
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register('toDO', {
              required: 'please Write a To Do',
            })}
            placeholder="Please Write a To Do"
          />
          <button>Add</button>
        </form>
      </div>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
