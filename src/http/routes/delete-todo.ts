import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteTodo(app: FastifyInstance) {
  app.delete('/todos/:todoId', async (request, reply) => {
    const getTodoParams = z.object({
      todoId: z.string().uuid() 
    })

    const { todoId } = getTodoParams.parse(request.params)

    const todoToDelete = await prisma.todo.delete({
      where: {
        id: todoId,
      }
    })

    if (!todoToDelete) {
      return reply.status(400).send({ message: 'Todo not found.' })
    }

    return reply.status(200).send({ message: 'The todo has been deleted.' })
  })
}