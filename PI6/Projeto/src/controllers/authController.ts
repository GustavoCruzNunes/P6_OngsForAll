// src/routes/authController.ts
import { FastifyReply, FastifyRequest } from 'fastify'
import { pool } from '../config/ds'
import bcrypt from 'bcryptjs'
import { z } from 'zod'


// Schema de validação
const userSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
})

const ongSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  cnpj: z.string().min(14).max(18),
  area_atuacao: z.string().min(1),
  telefone: z.string().min(8),
})

// Páginas
export async function renderAuthLoginPage(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const logoutSuccess = (request.query as any).logout === '1'
  return reply.view('/templates/auth/login.hbs', { logoutSuccess }, { layout: 'layouts/authLayout' })
}


export async function renderAuthRegisterPage(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  return reply.view('/templates/auth/register.hbs', {}, { layout: 'layouts/authLayout' })
}

// Cadastro de usuário
export async function registerUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const body = userSchema.parse(request.body)
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [body.nome, body.email, hashedPassword],
    )

    console.log('Usuário registrado com sucesso:', result)
    return reply.redirect('/login')
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
    return reply.status(400).send({ message: 'Erro ao registrar usuário', error })
  }
}

// Cadastro de ONG
export async function registerONG(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const body = ongSchema.parse(request.body)
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const [result] = await pool.execute(
      'INSERT INTO ongs (nome, email, senha, cnpj, area_atuacao, telefone) VALUES (?, ?, ?, ?, ?, ?)',
      [body.nome, body.email, hashedPassword, body.cnpj, body.area_atuacao, body.telefone],
    )

    console.log('ONG registrada com sucesso:', result)
    return reply.redirect('/login')
  } catch (error) {
    console.error('Erro ao registrar ONG:', error)
    return reply.status(400).send({ message: 'Erro ao registrar ONG', error })
  }
}

export async function loginUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { email, password } = request.body as { email: string; password: string }
  const ip = request.ip
  const dataHora = new Date()

  try {
    const [rows]: any = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email])

    const user = rows?.[0]
    const isPasswordValid = user ? await bcrypt.compare(password, user.senha) : false

    if (!user || !isPasswordValid) {
      // Log da tentativa inválida
      await pool.execute(
        'INSERT INTO login_logs (email, ip_address, data_hora, sucesso) VALUES (?, ?, ?, ?)',
        [email, ip, dataHora, false]
      )

      return reply.view('/templates/auth/login.hbs', {
        error: 'E-mail ou senha incorretos'
      }, { layout: 'layouts/authLayout' })
    }

    // Log do login com sucesso
    await pool.execute(
      'INSERT INTO login_logs (email, ip_address, data_hora, sucesso) VALUES (?, ?, ?, ?)',
      [email, ip, dataHora, true]
    )

    // Cria sessão
    request.session.user = {
      id: user.id,
      nome: user.nome,
      email: user.email
    }

    return reply.redirect('/dashboard?sucesso=1')
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return reply.status(500).send({ message: 'Erro no servidor', error })
  }
}


export async function logoutUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  await request.session.destroy()
  return reply.redirect('/login?logout=1')
}



