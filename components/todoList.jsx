import { useRecoilState } from "recoil";
import { todoListState, filterState } from "../store/index";
import TodoItem from "./todoItem"

const TodoList = () => {

    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [filter, setFilter] = useRecoilState(filterState);


    const handleDrop = (index, item) => {
        const newList = [...todoList];
        newList.splice(index, 0, newList.splice(item.currentIndex, 1)[0]);
        setTodoList(newList);
    };

    const filteredTasks = todoList.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "completed") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
    });

    return (
        <div className="mt-8">
            <div className="mb-4">
                <span className="mr-2 text-lg  font-serif font-semibold">Filter:</span>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="form-select p-2  bg-blue-100 "
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
            {filteredTasks.map((todo, index) => (
                <TodoItem key={index} index={index} todo={todo} handleDrop={handleDrop} />
            ))}
        </div>
    );
};



export default TodoList;