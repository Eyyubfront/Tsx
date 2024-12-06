import { IoRemoveCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { TodoType } from "../types/Types";
import { deleteTodoAsync, updateTodoAsync } from "../redux/todoSlice"; // updateTodoAsync ve deleteTodoAsync kullanıyoruz
import { useState } from "react";
import { useAppDispatch } from "../redux/store";

interface TodoProps {
  todoProps: TodoType;
}

const Todo = ({ todoProps }: TodoProps) => {
  const { id, content } = todoProps;
  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };


  const handleRemoveTodo = () => {
    if (window.confirm("Bu görevi silmek istediğinizden emin misiniz?")) {
      dispatch(deleteTodoAsync(id)); 
    }
  };

 
  const handleUpdateTodo = () => {
    const updatedTodo: TodoType = {
      id: id,
      content: newTodo,
    };
    dispatch(updateTodoAsync(updatedTodo)); 
    setEditable(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid lightgrey",
        padding: "15px 0px",
        marginTop: "25px",
      }}
    >
      {editable ? (
        <input
          type="text"
          onChange={handleInputChange}
          style={{
            width: "400px",
            border: "none",
            borderBottom: "1px solid lightgrey",
            outline: "none",
          }}
          value={newTodo}
        />
      ) : (
        <div>{content}</div>
      )}
      <div>
        <IoRemoveCircleOutline onClick={handleRemoveTodo} />
        {editable ? (
          <FaCheck onClick={handleUpdateTodo} />
        ) : (
          <FaEdit onClick={() => setEditable(true)} />
        )}
      </div>
    </div>
  );
};

export default Todo;
