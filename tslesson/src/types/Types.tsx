export interface TodoInitialState {
    todos: TodoType[];
    loading: boolean;  
    error: string | null;  
  }
  
  export interface TodoType {
    id: number;
    content: string;
  }
  