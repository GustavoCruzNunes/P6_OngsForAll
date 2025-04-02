import { FastifyInstance } from 'fastify'
import { renderDashBoardPage } from '../controllers/dashboardController'

export async function dashboardRoutes(fastify: FastifyInstance) {
  fastify.get('/dashboard', renderDashBoardPage)
}
