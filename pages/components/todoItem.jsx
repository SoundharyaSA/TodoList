import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { ItemTypes } from "../store/itemTypes";
import { useState } from "react";
import { todoListState } from "../store/index";

const TodoItem = ({ todo, index, handleDrop }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id: todo.id, currentIndex: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }); 

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (item) => {
            if (!todo.id) return;
            const dragIndex = item.currentIndex;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            handleDrop(hoverIndex, item);
            item.currentIndex = hoverIndex;
        },
    });

    const [todoList, setTodoList] = useRecoilState(todoListState);

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setTodoList(
            todoList.map((t) => (t.id === todo.id ? { ...t, text: editText } : t))
        );
        setIsEditing(false);
    };
    const handleDeleteClick = () => {
        setTodoList(todoList.filter((t) => t.id !== todo.id));
    };

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`p-4 bg-white shadow rounded-md mb-4 ${isDragging ? "opacity-50" : ""}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() =>
                            setTodoList(
                                todoList.map((t) =>
                                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                                )
                            )
                        }
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    {isEditing ? (
                        <div className="flex ml-3">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="mr-2 border border-gray-300 rounded px-2 py-1"
                            />
                            <button
                                onClick={handleSaveClick}
                                className="px-2 py-1 bg-green-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <span
                            className={`ml-3 ${todo.completed ? "line-through text-gray-500" : ""}`}
                        >
                            {todo.text}{" "}
                            <span
                                className={`p-5 ${todo.completed ? "text-green-500" : "text-red-500"
                                    } text-xs font-semibold`}
                            >
                                ({todo.completed ? "Completed" : "Not Completed"})
                            </span>
                        </span>
                    )}
                </div>
                <div className="flex">
                    {isEditing ? null : (
                        // <button
                        //     onClick={handleEditClick}
                        //     className="mr-2 p-5 px-2 py-1 bg-blue-500 text-white rounded"
                        // >
                        //     Edit
                        // </button>
                        <button className="mr-6 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" onClick={handleEditClick} />
                            </svg>
                        </button>
                    )}
                    {/* <button
                        onClick={handleDeleteClick}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" onClick={handleDeleteClick} />
                    </svg>


                </div>
            </div>
        </div>
    );
};
export default TodoItem;