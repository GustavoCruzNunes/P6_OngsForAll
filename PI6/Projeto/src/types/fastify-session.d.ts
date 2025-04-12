// src/types/fastify-session.d.ts
import '@fastify/session'

declare module 'fastify' {
  interface Session {
    user?: {
      id: number
      nome: string
      email: string
    }
    destroy: () => void
  }

  interface FastifyRequest {
    session: Session
  }
}
