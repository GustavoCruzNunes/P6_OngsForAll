import { FastifyReply, FastifyRequest } from 'fastify'

export async function renderDashBoardPage(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const user = request.session.user
  if (!user) return reply.redirect('/login')

  const sucesso = (request.query as any).sucesso === '1'

  return reply.view('/templates/dashboard.hbs', { user, sucesso }, { layout: 'layouts/dashboardLayout' })
}
