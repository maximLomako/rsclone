import React, {useReducer} from "react";
import {Todolist} from "../Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Grid, Paper} from "@material-ui/core";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "../../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../../state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";

const DashboardWithReducers = () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'Whats to lear', filter: 'all'},
    {id: todolistId2, title: 'What to do', filter: 'all'}
  ]);
  const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: 'css', isDone: true},
      {id: v1(), title: 'html', isDone: true},
      {id: v1(), title: 'react', isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: 'made 15 game', isDone: true},
      {id: v1(), title: 'lear tuesday program react in 2 weeks', isDone: true},
    ],
  })

  const addTask = (title: string, todolistId: string) => {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
  }
  const removeTask = (id: string, todolistId: string) => {
    dispatchToTasksReducer(removeTaskAC(id, todolistId));
  }
  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId));
  }
  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
  }

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    dispatchToTodolistsReducer(changeTodolistFilterAC(value, todolistId));
  }
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }
  const changeTodolistTitle = (id: string, newTitle: string) => {
    dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle))
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

    return (
      <div className="Dashboard">
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id];
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

export default DashboardWithReducers;
