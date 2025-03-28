import { FastifyInstance } from 'fastify'
import { authRoutes } from './authRoutes'
import { homeRoutes } from './homeRoutes'

export async function registerAllRoutes(fastify: FastifyInstance) {
  await authRoutes(fastify)
  await homeRoutes(fastify)
}
