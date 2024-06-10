import { atom, selector } from 'recoil';

export enum Categoryies {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface ITodo {
  text: string;
  category: Categoryies;
  id: number;
}

export const categoryState = atom<Categoryies>({
  key: 'category',
  default: Categoryies.TO_DO,
});

export const toDoState = atom<ITodo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const todos = get(toDoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
