const dotenv = require('dotenv')
const { mongooseConfig } = require('./mongoose')

async function initConfigurations () {
  dotenv.config()
  await mongooseConfig(process.env.NODE_ENV)
}

module.exports = { initConfigurations }
