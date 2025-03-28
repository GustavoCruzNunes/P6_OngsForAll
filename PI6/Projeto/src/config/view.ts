import { FastifyInstance } from 'fastify'
import pointOfView from '@fastify/view'
import handlebars from 'handlebars'
import path from 'path'

export default async function (fastify: FastifyInstance) {
  const viewsPath = path.join(__dirname, '..', 'views')
  /* const layoutsPath = path.join(__dirname, '..', 'views/layouts/main.hbs')

  console.log(`Views path: ${viewsPath}`)
  console.log(`Layouts path: ${layoutsPath}`) */
  fastify.register(pointOfView, {
    engine: {
      handlebars,
    },
    viewExt: 'hbs',
    root: viewsPath,
    /* layout: 'layouts/main', */
    options: {
      partials: {
        homenavbar: 'partials/homenavbar.hbs',
      },
    },
    defaultContext: {
      title: 'ONG For All',
    },
  })
}
