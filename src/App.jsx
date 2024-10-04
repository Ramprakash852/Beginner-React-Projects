import { useEffect } from "react";
import { useState } from "react";
import classes from "./style.module.css";
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, seterrorMsg] = useState(null);
  const [todoDeatils, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchlistofTodos(params) {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      console.log(result);
      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setLoading(false);
        seterrorMsg("");
      } else {
        setTodoList([]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      seterrorMsg("some error Occured");
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const details = await apiResponse.json();
      if (details) {
        setTodoDetails(details);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchlistofTodos();
  }, []);
  console.log(todoList);
  
  if(loading) return <Skeleton variant="rectangular" width={650} height={650}/>

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple Todo App using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                todo={todoItem}
              />
            ))
          : null}
      </div>
      <TodoDetails
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        todoDeatils={todoDeatils}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
}
