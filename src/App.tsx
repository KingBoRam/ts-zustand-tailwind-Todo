import './App.css';
import { todos } from '../config/types';
import { useTodo } from '../config/store';
import { ReactNode, useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  // https://velog.io/@2ast/React-Zustand-custom-selector%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94
  const { todos, addTodo, deleteTodo, checkTodo } = useTodo();

  const addList: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const todo: todos = {
      id: new Date().getTime(),
      text: input,
      checked: false,
    };
    addTodo(todo);
    setInput('');
  };

  const deleteList = (id: number) => {
    deleteTodo(id);
  };

  const checkList = (id: number) => {
    checkTodo(id);
  };

  return (
    <Div>
      <form onSubmit={addList}>
        <div className='m-4 flex gap-3 text-sm'>
          <input
            className='grow rounded-md border-[1px] px-2'
            type='text'
            name='todo-text'
            value={input}
            placeholder='할 일을 입력하세요.'
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button
            className='rounded-md bg-blue-500 px-4 py-2 text-white'
            type='submit'
            name='todo-submit-button'
          >
            추가
          </button>
        </div>
      </form>
      <ul className='m-4'>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className='mb-3 flex gap-1 border-b-[1px] pb-2'
              draggable
            >
              <input
                type='checkbox'
                checked={todo.checked}
                onChange={() => checkList(todo.id)}
              ></input>
              <p className='grow'>{todo.text}</p>
              <button
                className='h-6 w-6 rounded-[12px] bg-red-500 text-[9px] text-white'
                type='button'
                onClick={() => deleteList(todo.id)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </Div>
  );
}

export default App;

// https://shape-coding.tistory.com/entry/TypeScript-%EB%A6%AC%EC%95%A1%ED%8A%B8-children-%ED%83%80%EC%9E%85-%EC%A7%80%EC%A0%95%ED%95%B4%EC%A3%BC%EA%B8%B0-%ED%83%80%EC%9E%85%EB%B3%84-%ED%8A%B9%EC%A7%95
type MyComponentProps = {
  children: ReactNode;
};

function Div({ children }: MyComponentProps) {
  return (
    <div className='mx-auto my-0 mt-20 max-w-96 rounded-md border-[1px]'>
      {children}
    </div>
  );
}
