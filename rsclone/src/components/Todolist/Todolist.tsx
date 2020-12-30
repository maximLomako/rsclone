import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import s from './todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";

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
  changeTitle: (taskId: string, newValue: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {id, title, filter, tasks, addTask, removeTask,
    changeFilter, changeStatus, changeTitle, changeTodolistTitle,
    removeTodolist} = props;
  const onAllClickHandler = () => changeFilter('all', id);
  const onActiveClickHandler = () => changeFilter('active', id);
  const onCompletedClickHandler = () => changeFilter('completed', id);
  const removeTodolistHandler = () => {
    removeTodolist(id);
  }
  const addNewTask = (newTitle: string) => {
    addTask(newTitle, id)
  }
  const changeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle(id, newTitle)
  }

  return (
    <div>
      <h3> <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
        <button onClick={removeTodolistHandler}>x</button>
      </h3>
      <AddItemForm addItem={addNewTask}/>
      <ul>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id, id)
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked, id)
          }
          const onChangeTitleHandler = (newValue: string) => {
            changeTitle(t.id, newValue, props.id)
          }
          return <li key={t.id}
                     className={t.isDone ? `${s.isDone}` : ''}
          >
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeStatusHandler}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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
