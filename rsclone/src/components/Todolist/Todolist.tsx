// @ts-nocheck
import React from "react";
import s from "./todolist.module.css";
import { FilterValuesType } from "../Dashboard/Dashboard";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "./EditableSpan/EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { v1 } from "uuid";

export type TasksType = {
  id: string;
  title: any;
  isDone: boolean;
};
export type TodolistPropsType = {
  key: string;
  todo_id: string;
  title: any;
  tasks: any;
  filter: FilterValuesType;
  changeTodolist: (todo_id: string, updatedProps: any) => void;
  removeTodolist: (todo_id: string) => void;
};

export const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {
    todo_id,
    title,
    tasks,
    filter,
    removeTodolist,
    changeTodolist,
  } = props;
  let tasksArr = JSON.parse(tasks);
  let renderTasks = []
  switch (filter) {
    case 'active':
      renderTasks = tasksArr.filter((element) => element.isDone === false);
      break;
    case 'completed':
      renderTasks = tasksArr.filter((element) => element.isDone === true);
      break;
    default:renderTasks = tasksArr
      break;
  }

  const addNewTask = (newTask: string) => {
    const createdTask = [
      ...tasksArr,
      { title: newTask, task_id: v1(), isDone: false },
    ];
    changeTodolist(todo_id, { tasks: JSON.stringify(createdTask) });
  };

  const removeTask = (task_id: string) => {
    const tasksWitoutDeleted = tasksArr.filter(
      (element) => element.task_id !== task_id
    );
    changeTodolist(todo_id, { tasks: JSON.stringify(tasksWitoutDeleted) });
  };

  const changeDoneStatus = (task_id: string, status: boolean) => {
    const updatedTasks = tasksArr.map((element) => {
      if (element.task_id === task_id) {
        element.isDone = status;
        return element;
      } else {
        return element;
      }
    });
    changeTodolist(todo_id, { tasks: JSON.stringify(updatedTasks) });
  };

  const changeFilter = (newFilter: string) => {
    changeTodolist(todo_id, { filter: newFilter });
  };

  const changeTitle = (newTitle: any) => {
    changeTodolist(todo_id, newTitle);
  };

  return (
    <div>
      <h3>
        {/* @ts-ignore */}
        <EditableSpan title={title} onChange={changeTitle} />
        {/* @ts-ignore */}
        <IconButton aria-label="delete" onClick={() => removeTodolist(todo_id)}>
          <Delete fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addNewTask} />
      <div>
        {/* @ts-ignore */}
        {renderTasks.map((element) => {
          return (
            <div
              key={element.task_id}
              className={element.isDone ? `${s.isDone}` : ""}
            >
              <Checkbox
                color="secondary"
                checked={element.isDone}
                onClick={() =>
                  changeDoneStatus(element.task_id, !element.isDone)
                }
              />
              <EditableSpan title={element.title} onChange={changeTitle} />
              <IconButton
                aria-label="delete"
                onClick={() => removeTask(element.task_id)}
              >
                <Delete fontSize="small" style={{ color: green[500] }} />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={filter === "all" ? `contained` : "text"}
          onClick={() => changeFilter("all")}
        >
          All
        </Button>
        <Button
          color={"primary"}
          variant={filter === "active" ? `contained` : "text"}
          onClick={() => changeFilter("active")}
        >
          Active
        </Button>
        <Button
          color={"secondary"}
          variant={filter === "completed" ? `contained` : "text"}
          onClick={() => changeFilter("completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
