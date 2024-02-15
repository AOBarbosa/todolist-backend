import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getTodos(app: FastifyInstance) {
  app.get('/todos', async (request, reply) => {
    const todos = await prisma.todo.findMany()

    return reply.status(200).send(todos)
  })
}