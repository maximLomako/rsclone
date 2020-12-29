import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

const App = () => {
  const [tasks, setTasks] = useState<Array<TasksType>>([
    {id: v1(), title: 'first', isDone: true},
    {id: v1(), title: 'second', isDone: false},
    {id: v1(), title: 'third', isDone: true},
    {id: v1(), title: 'fourth', isDone: false},
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all')
  const addTask = (title: string) => {
    const newTask = {id: v1(), title: title, isDone: true};
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }
  const removeTask = (id: string) => {
    const newTasks = tasks.filter(t => t.id !== id)
    setTasks(newTasks)
  }
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }
  let tasksForTodolist = tasks;
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone)
  }
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone)
  }

  return (
    <div className="App">
      <Todolist title='what to learn'
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
      />
    </div>
  )
}

export default App;


