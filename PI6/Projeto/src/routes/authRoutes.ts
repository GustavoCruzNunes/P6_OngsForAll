import { FastifyInstance } from 'fastify'
import {
  renderAuthLoginPage,
  renderAuthRegisterPage,
} from '../controllers/authController'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/login', renderAuthLoginPage)

  fastify.get('/register', renderAuthRegisterPage)
}
