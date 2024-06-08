import { atom } from 'recoil';

export interface ITodo {
  text: string;
  category: 'TO_DO' | 'DOING' | 'DONE';
  id: number;
}

export const toDoState = atom<ITodo[]>({
  key: 'toDo',
  default: [],
});
