import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { todos } from './types';

interface todoStore {
  todos: todos[];
  addTodo: (obj: todos) => void;
  deleteTodo: (id: number) => void;
  checkTodo: (id: number) => void;
}

const useTodoStore = create<todoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (obj) => set((state) => ({ todos: [...state.todos, obj] })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      checkTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
          ),
        })),
    }),
    {
      name: 'todo-storage', // name of the item in the storage (must be unique)
    }
  )
);

// https://itchallenger.tistory.com/814
export const useTodo = () => useTodoStore((state) => state.todos);
export const useTodoAction = () => ({
  addTodo: useTodoStore((state) => state.addTodo),
  deleteTodo: useTodoStore((state) => state.deleteTodo),
  checkTodo: useTodoStore((state) => state.checkTodo),
});
