import './App.css';
import { todos } from '../config/types';
import { useTodo, useTodoAction } from '../config/store';
import { ReactNode } from 'react';
import Posts from './Components/Posts';
import Posts2 from './Components/Posts2';
import Posts3 from './Components/Posts3';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  todoText: string;
};

function App() {
  //https://tech.osci.kr/introduce-react-hook-form/
  const { register, handleSubmit, reset } = useForm<FormValues>({
    // mode는 유효성 검사를 할 타이밍을 정할 수 있음. 아래와같이 하면 change가 있을 때 마다 검사
    mode: 'onChange',
    // defaultValues는 초기값이 있을 때 설정, reset시에도 이 값으로 초기화 될 것
    defaultValues: {
      todoText: '',
    },
  });

  // https://velog.io/@2ast/React-Zustand-custom-selector%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94
  const todos = useTodo();
  const { addTodo, deleteTodo, checkTodo } = useTodoAction();

  const addList: SubmitHandler<FormValues> = (data) => {
    const todo: todos = {
      id: new Date().getTime(),
      text: data.todoText,
      checked: false,
    };
    addTodo(todo);
    reset();
  };

  const deleteList = (id: number) => {
    deleteTodo(id);
  };

  const checkList = (id: number) => {
    checkTodo(id);
  };

  return (
    <>
      <Div>
        <form onSubmit={handleSubmit(addList)}>
          <div className='m-4 flex gap-3 text-sm'>
            <input
              className='grow rounded-md border-[1px] px-2'
              type='text'
              placeholder='할 일을 입력하세요.'
              {...register('todoText', { required: true })}
            ></input>
            <button
              className='rounded-md bg-blue-500 px-4 py-2 text-white'
              type='submit'
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
      <br></br>
      <Posts></Posts>
      <br></br>
      <Posts2></Posts2>
      <br></br>
      <Posts3></Posts3>
    </>
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
