export default ({
  router,
  config,
  themes
}) => {
  router.post('/generate', async (req, res) => {
    const { body } = req
    const { theme } = body

    if (!config.themes.includes(theme)) {
      return res.status(400).json({
        code: 400,
        error: 'THEME_NOT_FOUND',
        message: 'Theme not found.'
      })
    }

    return themes[theme].generate(res, body)
  })
}
