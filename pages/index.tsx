import TodoList from "../components/todoList";
import TodoInput from "../components/todoInput";
import { DndProvider } from 'react-dnd';
import { RecoilRoot } from "recoil";
import { HTML5Backend } from 'react-dnd-html5-backend';
export default function Home() {
  return (
    <RecoilRoot>   
      <DndProvider  backend={HTML5Backend}>
        <div className="h-screen w-auto flex justify-center items-center bg-gray-200">
        <div className="container h-auto w-1/2 mx-auto p-4 rounded-xl bg-gray-300">
          <h1 className="text-3xl font-mono font-bold mb-4">Todo List</h1>
          <TodoList />
          <TodoInput />
        </div>
        </div>
      </DndProvider>
    </RecoilRoot>
  );
}