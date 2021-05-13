import express from 'express'
import setupLogger from './utils/logger'
import { version } from '../package.json'
import chalk from 'chalk'
import routes from './routes'
import { loadConfiguration } from './utils'
import themesList from './themes/themes'
import registerFonts from './utils/fonts'

registerFonts()

const logger = setupLogger()
const config = loadConfiguration()
const ctx = {
  logger,
  config
}
const themes = themesList(ctx)

logger.info(`Starting Musicorum Luyten ${chalk.cyan(version)}`)

const app = express()
app.use(express.json())

const loadRoutes = async () => {
  const router = express.Router()
  for (const route of routes) {
    route({
      ...ctx,
      themes,
      router
    })
  }
  return router
}

const port = process.env.PORT || 9815

loadRoutes()
  .then(router => app.use(router))
  .then(() => {
    app.use((req, res) => {
      res.status(404).json({
        code: 404,
        error: 'NOT_FOUND',
        message: 'Endpoint not found.'
      })
    })

    app.listen(port, () => {
      logger.info(`Server listening on port ${chalk.cyan(':' + port)}`)
    })
  })
