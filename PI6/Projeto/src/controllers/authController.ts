import { FastifyReply, FastifyRequest } from 'fastify'
export async function renderAuthLoginPage(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  return reply.view(
    '/templates/auth/login.hbs',
    {},
    {
      layout: 'layouts/authLayout',
    },
  )
}

export async function renderAuthRegisterPage(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  return reply.view(
    '/templates/auth/register.hbs',
    {},
    {
      layout: 'layouts/authLayout',
    },
  )
}
