import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../store/index";
import { nanoid } from "nanoid";

const TodoInput = () => {
  const [todoText, setTodoText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      setTodoList([...todoList, { id: nanoid(), text: todoText, completed: false }]);
      setTodoText("");
      setShowInput(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {!showInput ? (
        <button
          type="button"
          className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 rounded"
          onClick={() => setShowInput(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
      ) : (
        <>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter task..."
            className="form-input p-2 border border-gray-300 rounded outline-none mr-2 w-4/5 overflow-auto"
          />
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </>
      )}
    </form>
  );
};

export default TodoInput;