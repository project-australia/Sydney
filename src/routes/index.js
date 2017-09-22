var health = require('./health')
var notFound = require('./notFound')
var errorHandler = require('./errorHandler')
var someRoute = require('./someRoute')

function configureRoutes (app) {
  app.use('/some', someRoute)
  app.use('/health', health)

  app.use(notFound)
  app.use(errorHandler)
}

module.exports = configureRoutes
