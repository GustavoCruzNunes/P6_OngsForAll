import { FastifyInstance } from 'fastify'
import {
  registerONG,
  registerUser,
  renderAuthLoginPage,
  renderAuthRegisterPage,
  loginUser,
} from '../controllers/authController'
import { logoutUser } from '../controllers/authController'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/login', renderAuthLoginPage)

  fastify.get('/register', renderAuthRegisterPage)
  fastify.post('/register-user', registerUser)
  fastify.post('/register-ong',registerONG)

  fastify.post('/login', loginUser)
  fastify.get('/logout', logoutUser)
}
