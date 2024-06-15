import { atom } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
  isDelete: boolean;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ITodoState>({
  key: 'toDo',
  default: {},
});

export const isDarkAtom = atom<boolean>({
  key: 'isDark',
  default: true, // 초기 상태는 darkTheme
});
