import { FastifyReply, FastifyRequest } from 'fastify'
export async function renderDashBoardPage(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  return reply.view(
    '/templates/dashboard.hbs',
    {},
    {
      layout: 'layouts/dashboardLayout'
    }
  )
}
