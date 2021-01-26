import React, { useState, useEffect } from "react";
import { TasksType, Todolist } from "../Todolist/Todolist";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Grid, Paper } from "@material-ui/core";
import { httpGet, httpPost, httpPut, httpDelete, mergeArrays } from "../../utils";
import Preloader from "../Preloader/Preloader";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
  todo_id: string;
  title: any;
  filter: FilterValuesType;
  user_id: string;
  tasks: string;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

const Dashboard = () => {
  const [todolists, setTodolists] = useState<Array<TodolistsType>>([]);
  const [todolistLoading, setTodolistLoading] = useState<boolean>(false);

  const addTodolist = async (title: string) => {
    await setTodolistLoading(true);
    httpPost(`/todos`, { title: title })
      .then((post) => {
        setTodolists([...todolists, post]);
      })
      .catch((post) => {
        console.log(post);
      })
      //@ts-ignore
      .then(setTodolistLoading(false));
  };
  const changeTodolist = async (todo_id: string, updatedProps: any) => {
    await setTodolistLoading(true);
    const changedElement = todolists.filter((el) => el.todo_id === todo_id);
    //@ts-ignore
    changedElement[0][`${Object.keys(updatedProps)}`] = Object.values(
      updatedProps
    ).toString();
    httpPut(`/todos/${todo_id}`, updatedProps)
      .then(() => {
        setTodolists(mergeArrays(todolists, changedElement));
      })
      .catch((post) => {
        console.log(post);
      })
      //@ts-ignore
      .then(setTodolistLoading(false));
  };
  const removeTodolist = async (todo_id: string) => {
    await setTodolistLoading(true);
    setTodolistLoading(true);
    httpDelete(`/todos/${todo_id}`)
      .then(() => {
        setTodolists(todolists.filter((el) => el.todo_id !== todo_id));
      })
      .catch((e) => {
        console.log(e);
      })
      //@ts-ignore
      .then(setTodolistLoading(false));
  };

  useEffect(() => {
    setTodolistLoading(true);
    httpGet("/todos")
      .then((post) => {
        setTodolists(post);
      })
      .catch((post) => {
        console.log(post);
      })
      //@ts-ignore
      .then(setTodolistLoading(false));
  }, []);

  return todolistLoading ? (
    <Preloader />
  ) : (
    <div className="Dashboard">
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((element) => {
          return (
            <Grid key={element.user_id} item>
              <Paper key={element.user_id} style={{ padding: "10px" }}>
                <Todolist
                  key={element.todo_id}
                  todo_id={element.todo_id}
                  title={element.title}
                  tasks={element.tasks}
                  filter={element.filter}
                  changeTodolist={changeTodolist}
                  removeTodolist={removeTodolist}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
