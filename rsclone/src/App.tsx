import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./components/Todolist/Todolist";

const App = () => {
  let task: Array<TasksType> = [
    {id: 1, title: 'first', isDone: true},
    {id: 2, title: 'second', isDone: false},
    {id: 3, title: 'third', isDone: true},
    {id: 4, title: 'fourth', isDone: false},
  ]
  const [tasks, setTasks] = useState(task);
  const removeTask = (id: number) => {
    const newTasks = tasks.filter(t => t.id !== id)
    setTasks(newTasks)
  }

  return (
    <div className="App">
      <Todolist title='what to learn'
                tasks={tasks}
                removeTask={removeTask}
      />
    </div>
  )
}

export default App;


