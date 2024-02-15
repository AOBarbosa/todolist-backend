import fastify from "fastify";
import { createTodo } from "./routes/create-todo";
import { getTodos } from "./routes/get-todos";
import { deleteTodo } from "./routes/delete-todo";
import { updateTodoStatus } from "./routes/check-todo";
import { updateTodoContent } from "./routes/update-todo-content";
import { updateTodoPriority } from "./routes/update-todo-priority";

const app = fastify()

app.register(createTodo)
app.register(getTodos)
app.register(deleteTodo)
app.register(updateTodoStatus)
app.register(updateTodoContent)
app.register(updateTodoPriority)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running')
}) 