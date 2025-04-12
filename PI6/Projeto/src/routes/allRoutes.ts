import { FastifyInstance } from 'fastify'
import { authRoutes } from './authRoutes'
import { homeRoutes } from './homeRoutes'
import { dashboardRoutes } from './dashboardRoutes'
import { perfilRoutes } from './perfilRoutes'


export async function registerAllRoutes(fastify: FastifyInstance) {
  await authRoutes(fastify)
  await homeRoutes(fastify)
  await dashboardRoutes(fastify)
  await perfilRoutes(fastify)
}
