import { FastifyInstance } from 'fastify'
import { renderDashBoardPage } from '../controllers/dashboardController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export async function dashboardRoutes(fastify: FastifyInstance) {
  fastify.get('/dashboard',{ preHandler: ensureAuthenticated }, renderDashBoardPage)
}
