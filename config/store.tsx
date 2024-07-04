import { create } from 'zustand';
import { todos } from './types';

interface todoStore {
  todos: [] | todos[];
  addTodo: (obj: todos) => void;
}

export const useTodo = create<todoStore>((set) => ({
  todos: [],
  addTodo: (obj) => set((state) => ({ todos: [...state.todos, obj] })),
}));
