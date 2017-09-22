import health from './health'
import notFound from './notFound'
import errorHandler from './errorHandler'
import someRoute from './someRoute'

export default function configureRoutes (app) {
  app.use('/some', someRoute)
  app.use('/health', health)

  app.use(notFound)
  app.use(errorHandler)
}
