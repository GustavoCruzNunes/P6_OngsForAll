import { FastifyInstance } from 'fastify'
import { authRoutes } from './authRoutes'
import { homeRoutes } from './homeRoutes'
import { dashboardRoutes } from './dashboardRoutes'


export async function registerAllRoutes(fastify: FastifyInstance) {
  await authRoutes(fastify)
  await homeRoutes(fastify)
  await dashboardRoutes(fastify)
}
