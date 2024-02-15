import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

export async function updateTodoPriority(app: FastifyInstance) {
  app.patch('/todos/:todoId/priority', async (request, reply) => {
    const getTodoParams = z.object({
      todoId: z.string().uuid() 
    })
    
    const { todoId } = getTodoParams.parse(request.params)
    
    const getTodoBody = z.object({
      priority: z.string(),
    })

    const { priority } = getTodoBody.parse(request.body)

    const todoToUpdate = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        priority,
      }
    })

    if (!todoToUpdate) {
      return reply.status(400).send({ message: 'Todo not found.' })
    }

    return reply.status(204).send()
  })
}
