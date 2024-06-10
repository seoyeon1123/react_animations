import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import CreateToDo from './CreateToDo';
import { Categoryies, categoryState, toDoSelector } from './atoms';
import ToDo from './ToDo';

const ToDoList = () => {
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(category);

  return (
    <>
      <div>
        <h1>To Dos</h1>
        <hr />
        <select value={category} onInput={onInput}>
          <option value={Categoryies.TO_DO}>To Do</option>
          <option value={Categoryies.DOING}>Doing</option>
          <option value={Categoryies.DONE}>Done</option>
        </select>
        <CreateToDo />
        {todos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </div>
    </>
  );
};

export default ToDoList;
