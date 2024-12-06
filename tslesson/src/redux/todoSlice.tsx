import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TodoType, TodoInitialState } from '../types/Types';
import axios from 'axios';

// GET isteği
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:5000/todos');
  return response.data;
});

// POST isteği
export const createTodoAsync = createAsyncThunk(
  'todos/createTodo',
  async (newTodo: TodoType) => {
    const response = await axios.post('http://localhost:5000/todos', newTodo);
    return response.data;
  }
);

// DELETE isteği
export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    const response = await axios.delete(`http://localhost:5000/todos/${id}`);
    return id; 
  }
);


export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo: TodoType) => {
    const response = await axios.put(
      `http://localhost:5000/todos/${updatedTodo.id}`,
      updatedTodo
    );
    return response.data; 
  }
);

const initialState: TodoInitialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

    removeTodoById: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  
    updateTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos = state.todos.map((todo) =>
        todo.id !== action.payload.id ? todo : action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Xəta baş verdi';
    });

    builder.addCase(createTodoAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodoAsync.fulfilled, (state, action) => {
      state.todos.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createTodoAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Xəta baş verdi';
    });

    builder.addCase(deleteTodoAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      // Silinen todo'yu store'dan çıkarıyoruz
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteTodoAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Xəta baş verdi';
    });

    builder.addCase(updateTodoAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodoAsync.fulfilled, (state, action) => {

      state.todos = state.todos.map((todo) =>
        todo.id !== action.payload.id ? todo : action.payload
      );
      state.loading = false;
    });
    builder.addCase(updateTodoAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Xəta baş verdi';
    });
  },
});

export const { removeTodoById, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;



// /onlick oldugunda elementin id-sini goturmek ve onu istediyimiz kimi deyisiklik etmek ve silmek 