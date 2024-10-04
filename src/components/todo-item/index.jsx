import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function TodoItem({ todo,fetchDetailsOfCurrentTodo}) {
  console.log(todo);

  return (
    <Card
      sx={{
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5">{todo?.todo}</Typography>
      </CardContent>
      <CardActions>
        <Button 
         onClick={() => fetchDetailsOfCurrentTodo(todo?.id)}
          sx={{
            backgroundColor: "black",
            color: "white",
            opacity: 0.75,
            "&:hover": {
              backgroundColor: "black",
              color: "white",
              opacity: 1,
            },
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
