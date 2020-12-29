import React from "react";
import {FilterValuesType} from "../../App";

export type TasksType = {
  id: number
  title: string
  isDone: boolean
}
type TodolistPropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: number) => void
  changeFilter: (id: FilterValuesType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {title, tasks, removeTask, changeFilter} = props;

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
            <button onClick={() => removeTask(t.id)}>
              x
            </button>
          </li>)}
      </ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}
