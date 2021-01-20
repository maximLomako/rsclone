import React from "react";
import {TasksType, Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "../../redux/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {DashboardRootState} from "../../redux/store";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

const Dashboard = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<DashboardRootState, Array<TodolistsType>>(state => state.todolist);
    const tasks = useSelector<DashboardRootState, TasksStateType>(state => state.tasks);

    const addTask = (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId));
    }
    const removeTask = (id: string, todolistId: string) => {
      dispatch(removeTaskAC(id, todolistId));
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(value, todolistId));
    }
    const removeTodolist = (todolistId: string) => {
      const action = removeTodolistAC(todolistId);
      dispatch(action);
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(id, newTitle))
    }
    const addTodolist = (title: string) => {
      const action = addTodolistAC(title);
      dispatch(action);
    }

    return (
      <div className="Dashboard">
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
            }
            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
            }
            return (
              <Grid key={tl.id} item>
                <Paper key={tl.id} style={{padding: "10px"}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
;

export default Dashboard;
