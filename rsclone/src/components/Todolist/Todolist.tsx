import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../../App";

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistPropsType = {
  title: string
  tasks: Array<TasksType>
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (id: FilterValuesType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {title, tasks, addTask, removeTask, changeFilter} = props;
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const {key} = e;
    if (key === 'Enter') {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  }
  const addTaskHandler = () => {
    addTask(newTaskTitle);
    setNewTaskTitle('');
  }
  const onAllClickHandler = () => changeFilter('all');
  const onActiveClickHandler = () => changeFilter('active');
  const onCompletedClickHandler = () => changeFilter('completed')

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTaskHandler}>+
        </button>
      </div>
      <ul>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id)
          return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={removeTaskHandler}>
              x
            </button>
          </li>
        })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
