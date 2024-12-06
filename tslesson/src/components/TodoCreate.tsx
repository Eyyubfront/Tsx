import { useState } from 'react';
import { createTodoAsync } from '../redux/todoSlice';
import { TodoType } from '../types/Types';
import { useAppDispatch } from '../redux/store';

const TodoCreate = () => {
  const dispatch = useAppDispatch();
  const [newTodo, setNewTodo] = useState<string>('');
  const generateUniqueId = (): number => {
    return Math.floor(Math.random() * 999999999999999); 
  };
  const InputsOnchanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }
  const handleCreateTodo = () => {
    if (newTodo.trim().length === 0) {
      alert('Todo girin');
      return;
    }

    const payload: TodoType = {
      id: generateUniqueId(), 
      content: newTodo,
    };

    
    dispatch(createTodoAsync(payload));

    setNewTodo(''); 
  };

 
  return (
    <div className="todo-create">
      <input
        placeholder="Todo girin..."
        className="todo-input"
        type="text"
        value={newTodo}
        onChange={InputsOnchanges}
      />
      <button onClick={handleCreateTodo} className="todo-btn">
        Yarat
      </button>
    </div>
  );
};

export default TodoCreate;
