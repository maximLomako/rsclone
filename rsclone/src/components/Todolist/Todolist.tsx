import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import s from './todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
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
  const {
    id, title, filter, tasks, addTask, removeTask,
    changeFilter, changeStatus, changeTitle, changeTodolistTitle,
    removeTodolist
  } = props;
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
      <h3><EditableSpan
        title={title}
        onChange={changeTodolistTitleHandler}/>
        <IconButton
          aria-label="delete"
          onClick={removeTodolistHandler}>
          <Delete fontSize="small"/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addNewTask}/>
      <div>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id, id)
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(t.id, e.currentTarget.checked, id)
          }
          const onChangeTitleHandler = (newValue: string) => {
            changeTitle(t.id, newValue, props.id)
          }
          return <div
            key={t.id}
            className={t.isDone ? `${s.isDone}` : ''}
          >
            <Checkbox
              color="secondary"
              checked={t.isDone}
              onChange={onChangeStatusHandler}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <IconButton
              aria-label="delete"
              onClick={removeTaskHandler}>
              <Delete
                fontSize="small"
                style={{color: green[500]}}/>
            </IconButton>
          </div>
        })
        }
      </div>
      <div>
        <Button
          variant={filter === 'all' ? `contained` : 'text'}
          onClick={onAllClickHandler}>All
        </Button>
        <Button
          color={"primary"}
          variant={filter === 'active' ? `contained` : 'text'}
          onClick={onActiveClickHandler}>Active
        </Button>
        <Button
          color={"secondary"}
          variant={filter === 'completed' ? `contained` : 'text'}
          onClick={onCompletedClickHandler}>Completed
        </Button>
      </div>
    </div>
  )
}
