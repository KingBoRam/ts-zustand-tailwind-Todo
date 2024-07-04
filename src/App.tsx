import './App.css';
import { useState } from 'react';
import { useTodo } from '../config/store';
import { todos } from '../config/types';

function App() {
  const [input, setInput] = useState('');
  const { todos, addTodo } = useTodo();

  const addList: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const todo: todos = { id: new Date().getTime(), text: input };
    addTodo(todo);
    setInput('');
  };

  return (
    <div className='border-solid border-2 max-w-96 rounded-md mx-auto my-0 mt-20'>
      <form onSubmit={addList}>
        <input
          type='text'
          name='todo-text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type='submit' name='todo-submit-button'>
          제출
        </button>
      </form>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.text}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
