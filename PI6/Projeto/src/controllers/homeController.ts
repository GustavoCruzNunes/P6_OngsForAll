import { FastifyRequest, FastifyReply } from 'fastify'

interface Data {
  stitle: string
}

export async function renderHomePage(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const data: Data = {
    stitle: 'Início',
  }

  return reply.view('/templates/index.hbs', data, { layout: 'layouts/main' })
}
