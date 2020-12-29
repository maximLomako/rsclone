import React from "react";

export type TasksType = {
  id: number
  title: string
  isDone: boolean
}
type TodolistPropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: number) => void
}

export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasks.map(t =>
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() =>{removeTask(t.id)}}>x
            </button>
          </li>)}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}
