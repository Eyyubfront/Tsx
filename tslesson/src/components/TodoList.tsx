import { useEffect } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { fetchTodos } from '../redux/todoSlice'; 
import Todo from './Todo'; 

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos()); 
  }, [dispatch]);

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todoProps={todo} />
      ))}
    </div>
  );
};

export default TodoList;
