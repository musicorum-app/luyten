import { version } from '../../package.json'

export default ({
  router,
  config
}) => {
  router.get('/metadata', (req, res) => {
    res.json({
      name: config.name,
      engine: 'luyten',
      version: version,
      scheme: 1.0,
      themes: config.themes
    })
  })
}
