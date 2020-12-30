import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../../App";
import s from './todolist.module.css'

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistPropsType = {
  id: string
  title: string
  filter: FilterValuesType
  tasks: Array<TasksType>
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (id: FilterValuesType, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {id, title, filter, tasks, addTask, removeTask, changeFilter, changeStatus, removeTodolist} = props;
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (newTaskTitle.trim() === '') {
    }
    setNewTaskTitle(e.currentTarget.value)
    setError(null);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const {key} = e;
    if (key === 'Enter') {
      addTask(newTaskTitle, id);
      setNewTaskTitle('');
    }
  };
  const addTaskHandler = () => {
    if (newTaskTitle.trim() === '') {
      setError('Title is required');
      return;
    }
    addTask(newTaskTitle.trim(), id);
    setNewTaskTitle('');
  };
  const onAllClickHandler = () => changeFilter('all', id);
  const onActiveClickHandler = () => changeFilter('active', id);
  const onCompletedClickHandler = () => changeFilter('completed', id);
  const removeTodolistHandler = () => {
    removeTodolist(id);
  }

  return (
    <div>
      <h3>{title}
        <button onClick={removeTodolistHandler}>x</button>
      </h3>
      <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? `${s.error}` : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className={s.errorMessage}>{error}</div>}
      </div>
      <ul>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id, id)
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked, id)
          }
          return <li key={t.id}
                     className={t.isDone ? `${s.isDone}` : ''}
          >
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeStatusHandler}/>
            <span>{t.title}</span>
            <button onClick={removeTaskHandler}>
              x
            </button>
          </li>
        })
        }
      </ul>
      <div>
        <button className={filter === 'all' ? `${s.activeFilter}` : ''}
                onClick={onAllClickHandler}>All
        </button>
        <button className={filter === 'active' ? `${s.activeFilter}` : ''}
                onClick={onActiveClickHandler}>Active
        </button>
        <button className={filter === 'completed' ? `${s.activeFilter}` : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}
