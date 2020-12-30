import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistId1, title: 'tl1', filter: 'all'},
    {id: todolistId2, title: 'tl2', filter: 'completed'},
  ])
  const [tasksObj, setTasks] = useState({
    [todolistId1]: [
      {id: v1(), title: 'first', isDone: true},
      {id: v1(), title: 'second', isDone: false},
      {id: v1(), title: 'third', isDone: true},
      {id: v1(), title: 'fourth', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'f', isDone: true},
      {id: v1(), title: 's', isDone: false}
    ]
  });
  const addTask = (title: string, todolistId: string) => {
    const task = {id: v1(), title: title, isDone: false};
    const tasks = tasksObj[todolistId];
    tasksObj[todolistId] = [...tasks, task]
    setTasks({...tasksObj});
  }
  const removeTask = (id: string, todolistId: string) => {
    const tasks = tasksObj[todolistId];
    tasksObj[todolistId] = tasks.filter(t => t.id !== id);
    setTasks({...tasksObj});

  }
  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    const todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  }
  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const task = tasksObj[todolistId].find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
  }
  const removeTodolist = (todolistId: string) => {
    const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({...tasksObj});

  }


  return (
    <div className="App">
      {todolists.map(tl => {
        let tasksForTodolist = tasksObj[tl.id];
        if (tl.filter === 'completed') {
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        }
        if (tl.filter === 'active') {
          tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
        }
        return <Todolist key={tl.id}
                         id={tl.id}
                         title={tl.title}
                         filter={tl.filter}
                         tasks={tasksForTodolist}
                         addTask={addTask}
                         removeTask={removeTask}
                         changeFilter={changeFilter}
                         changeStatus={changeStatus}
                         removeTodolist={removeTodolist}
        />
      })}
    </div>
  )
}

export default App;


