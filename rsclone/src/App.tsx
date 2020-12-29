import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./components/Todolist/Todolist";

const App = () => {

  let tasks1:Array<TasksType> = [
    {id: 1, title: 'first', isDone: true},
    {id: 2, title: 'second', isDone: false},
    {id: 3, title: 'third', isDone: true}
  ]
  let tasks2:Array<TasksType> = [
    {id: 1, title: 'f', isDone: true},
    {id: 2, title: 's', isDone: false},
    {id: 3, title: 't', isDone: false}
  ]

  return (
    <div className="App">
      <Todolist title='what to learn' tasks={tasks1}/>
      <Todolist title='movies' tasks={tasks2}/>
    </div>
  )
}

export default App;


