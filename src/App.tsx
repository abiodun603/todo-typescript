import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult, } from 'react-beautiful-dnd';

const App:React.FC = () => {
  // state
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false }])
      setTodo("");
    }
  }

  console.log(todos);

  const onDragEnd = (result:DropResult) => {
    console.log(result)
    const {source, destination} = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add,
        active = todos,
        complete = completedTodos;

        if(source.droppableId === "TodosList"){
          // returns an object of todos that has the same index as source.index
          add = active[source.index] 

          // The splice() method overwrites the original array.
          // The splice() method adds and/or removes array elements.
          active.splice(source.index, 1) ;
     
        } else {
          add = complete[source.index];
          complete.splice(source.index, 1)
        }

      if(destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add)
      } else{
        complete.splice(destination.index, 0 , add)
      }
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField 
          todo={todo}  
          setTodo={setTodo} 
          handleAdd = {handleAdd}/>
        <br/>
        {
          todos && todos.length > 0 ?
          <TodoList 
            todos={todos} 
            setTodos={setTodos} 
            completedTodos = {completedTodos} 
            setCompletedTodos = {setCompletedTodos}
          /> : ""
        }
      </div>
    </DragDropContext>
  );
}

export default App;
