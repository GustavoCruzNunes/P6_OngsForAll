import fastify from 'fastify'
import formBody from '@fastify/formbody'
import initViewEngine from './config/view'
import fastifyStatic from '@fastify/static'
import path from 'path'
import 'dotenv/config'
import { registerAllRoutes } from './routes/allRoutes'
const host = process.env.NODE_APP_HOST || 'localhost'
const port = process.env.NODE_APP_PORT || 3000

const server = fastify()

server.register(formBody)

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
