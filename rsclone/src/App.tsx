import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./components/Todolist/Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

const App = () => {
  const [tasks, setTasks] = useState<Array<TasksType>>([
    {id: 1, title: 'first', isDone: true},
    {id: 2, title: 'second', isDone: false},
    {id: 3, title: 'third', isDone: true},
    {id: 4, title: 'fourth', isDone: false},
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all')
  const removeTask = (id: number) => {
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
                removeTask={removeTask}
                changeFilter={changeFilter}
      />
    </div>
  )
}

export default App;


