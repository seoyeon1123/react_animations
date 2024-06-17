import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface ITodo {
  id: number;
  text: string;
  isDelete: boolean;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

const { persistAtom } = recoilPersist({
  key: 'todoPersist',
  storage: localStorage,
});

export const toDoState = atom<ITodoState>({
  key: 'toDoState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const isDarkAtom = atom<boolean>({
  key: 'isDark',
  default: true,
});
