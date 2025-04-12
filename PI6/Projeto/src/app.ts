import fastify from 'fastify'
import formBody from '@fastify/formbody'
import initViewEngine from './config/view'
import fastifyStatic from '@fastify/static'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import path from 'path'
import 'dotenv/config'
import { registerAllRoutes } from './routes/allRoutes'

const host = process.env.NODE_APP_HOST || 'localhost'
const port = process.env.NODE_APP_PORT || 3000

const server = fastify()

server.register(formBody)

// 🔐 Registro dos plugins de sessão
server.register(fastifyCookie)
server.register(fastifySession, {
  secret: 'f@st1fy_s3cr3t_sess10n_key_super_segura_123!',
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // 1 dia
  }
})

server.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
  prefix: '/public/',
})

initViewEngine(server)
registerAllRoutes(server)

server.listen({ port: Number(port) }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor rodando em: http://${host}:${port}`)
})
