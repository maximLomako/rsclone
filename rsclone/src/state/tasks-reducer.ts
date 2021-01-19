import {TasksStateType} from "../components/Dashboard/Dashboard";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}
type AddTaskActionType = {
  type: 'ADD-TASK'
  todolistId: string
  title: string
}
type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  isDone: boolean
  todolistId: string
}
type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  title: string
  todolistId: string
}

type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK:
      const filteredTasks = state[action.todolistId].filter(t => t.id !== action.taskId)
      return {
        ...state,
        [action.todolistId]: filteredTasks
      }
    case ADD_TASK:
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      }
    case CHANGE_TASK_STATUS:
      const changedTask = state[action.todolistId].find(t => t.id === action.taskId)
      if (changedTask) {
        changedTask.isDone = action.isDone
      }
      return {
        ...state
      }
    case CHANGE_TASK_TITLE:
      const changedTaskTitle = state[action.todolistId].find(t => t.id === action.taskId)
      if (changedTaskTitle) {
        changedTaskTitle.title = action.title
      }
      return {
        ...state
      }
    case 'ADD-TODOLIST':
      const stateCopy = {...state}
      stateCopy[action.todolistId] = [];
      return stateCopy;
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.id]
      return stateCopy;
    }

    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: REMOVE_TASK, todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: ADD_TASK, title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {type: CHANGE_TASK_STATUS, taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: CHANGE_TASK_TITLE, taskId, title, todolistId}
}

