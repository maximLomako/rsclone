import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../../App";
import s from './todolist.module.css'

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistPropsType = {
  title: string
  filter: FilterValuesType
  tasks: Array<TasksType>
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (id: FilterValuesType) => void
  changeStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {title, filter, tasks, addTask, removeTask, changeFilter, changeStatus} = props;
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
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };
  const addTaskHandler = () => {
    if (newTaskTitle.trim() === '') {
      setError('Title is required');
      return;
    }
    addTask(newTaskTitle.trim());
    setNewTaskTitle('');
  };
  const onAllClickHandler = () => changeFilter('all');
  const onActiveClickHandler = () => changeFilter('active');
  const onCompletedClickHandler = () => changeFilter('completed');

  return (
    <div>
      <h3>{title}</h3>
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
          const removeTaskHandler = () => removeTask(t.id)
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked)
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
