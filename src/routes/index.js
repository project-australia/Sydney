var home = require('./home')
var health = require('./health')
var notFound = require('./notFound')
var errorHandler = require('./errorHandler')

function configureRoutes (app) {
  app.use('/', home)
  app.use('/health', health)

  app.use(notFound)
  app.use(errorHandler)
}

module.exports = configureRoutes
