import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function updateTodoContent(app: FastifyInstance) {
  app.put('/todos/:todoId', async (request, reply) => {
    const getTodoParams = z.object({
      todoId: z.string().uuid() 
    })
    
    const { todoId } = getTodoParams.parse(request.params)
    
    const getTodoBody = z.object({
      content: z.string(),
    })

    const { content } = getTodoBody.parse(request.body)

    const todoToUpdate = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        content,
      }
    })

    if (!todoToUpdate) {
      return reply.status(400).send({ message: 'Todo not found.' })
    }

    return reply.status(204).send()
  })
}
