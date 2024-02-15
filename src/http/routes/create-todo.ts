import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createTodo(app: FastifyInstance) {
  app.post('/todos', async (request, reply) => {
    const createTodoBody = z.object({
      content: z.string()
    })

    const { content } = createTodoBody.parse(request.body)

    const todo = await prisma.todo.create({
      data: {
        content,
      }
    })

    return reply.status(201).send(todo)
  })
}