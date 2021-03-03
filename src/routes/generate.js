export default ({
  router,
  config,
  themes
}) => {
  router.post('/generate', async (req, res) => {
    const { body } = req
    const { theme } = body

    if (!config.themes.includes(theme)) {
      res.status(400).json({
        code: 400,
        error: 'THEME_NOT_FOUND',
        message: 'Theme not found.'
      })
    }

    res.json(await themes[theme].generate(body))
  })
}
