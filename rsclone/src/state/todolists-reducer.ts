import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}

type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilter = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

type ActionsType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilter

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id);
    }
    case 'ADD-TODOLIST': {
      return [...state, {
        id: v1(),
        title: action.title,
        filter: "all"
      }]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter
      }
      return [...state]
    }
    default:
      throw new Error("I don't understand this type")
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId,
    title: todolistTitle
  }
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilter => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: newFilter
  }
}
