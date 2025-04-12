import { FastifyReply, FastifyRequest } from 'fastify'
import { pool } from '../config/ds'
import bcrypt from 'bcryptjs'

export async function renderEditarPerfil(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const user = request.session.user
  return reply.view('/templates/editarPerfil.hbs', { user }, { layout: 'layouts/perfilLayout' })
}

export async function salvarPerfil(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { id, nome, email, password } = request.body as {
    id: string
    nome: string
    email: string
    password?: string
  }

  try {
    let query = 'UPDATE usuarios SET nome = ?, email = ?'
    const params: any[] = [nome, email]

    if (password) {
      const hash = await bcrypt.hash(password, 10)
      query += ', senha = ?'
      params.push(hash)
    }

    query += ' WHERE id = ?'
    params.push(id)

    await pool.execute(query, params)

    // Atualiza sessão com novos dados
    request.session.user = {
      id: Number(id),
      nome,
      email
    }

    return reply.redirect('/dashboard')
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return reply.status(500).send({ message: 'Erro ao atualizar perfil', error })
  }
}
