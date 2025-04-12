import { FastifyInstance } from 'fastify'
import { renderEditarPerfil, salvarPerfil } from '../controllers/perfilController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export async function perfilRoutes(fastify: FastifyInstance) {
  fastify.get('/perfil/editar', { preHandler: ensureAuthenticated }, renderEditarPerfil)
  fastify.post('/perfil/editar', { preHandler: ensureAuthenticated }, salvarPerfil)
}
