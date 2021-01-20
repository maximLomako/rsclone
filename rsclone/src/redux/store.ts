import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: tasksReducer
})

export type DashboardRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;