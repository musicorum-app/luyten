import Theme from '../Theme'
import nodeCanvas, { createCanvas } from 'canvas'
import chroma from 'chroma-js'
import { Quadro } from '@musicorum/quadro'

const colorsPallete = {
  PURPLISH: ['#16006F', '#F7396F'],
  NATURAL: ['#1A2A56', '#00D574'],
  DIVERGENT: ['#7a004f', '#80f8f8'],
  SUN: ['#EA1264', '#D7FD31'],
  YELLISH: ['#141209', '#ffea00'],
  HORROR: ['#131313', '#B71C1C'],
  SEA: ['#0239d8', '#68ebc1'],
  REEN: ['#C1384C', '#00DC72'],
  NEON: ['#732fd0', '#44ff94']
}

export default class DuotoneTheme extends Theme {
  constructor (data) {
    super('duotone', data)
  }

  async render ({
    id,
    hide_username: hideUsername,
    user,
    data
  }) {
    const canvas = nodeCanvas.createCanvas(1200, 600)
    const ctx = canvas.getContext('2d')
    const qdr = new Quadro(ctx, nodeCanvas)

    const palette = colorsPallete[data.palette]

    qdr.fillStyle = palette[1]
    qdr.fillRect(0, 0, qdr.width, qdr.height)

    qdr.imageFit = 'cover'

    const margin = 30
    const duotoneWidth = 360
    const avatarSize = 380

    // Duotone background && avatar image

    const userImage = await this.loadImage(user.image)
    qdr.drawFittedImage(this.duotoneImage(userImage, palette), 0, 0, duotoneWidth, qdr.height)

    qdr.yAlign = 'center'
    qdr.drawFittedImage(userImage, margin * 2, qdr.height / 2, avatarSize, avatarSize)

    // Duotone background images
    qdr.globalAlpha = 0.35

    const images = await Promise.all(
      data.items
        .slice(0, 6)
        .map(i => this.loadImage(i.image))
    )

    const imageGap = 10
    const imageSize = (qdr.height - (margin * 2) - (imageGap * 2)) / 3

    qdr.xAlign = 'right'
    qdr.yAlign = 'top'

    for (const i in data.items) {
      if (i > 5) break

      let imageX = i > 2 ? 0 : 1
      imageX = qdr.width - margin - ((imageGap + imageSize) * imageX)

      const imageY = margin + ((i > 2 ? i - 3 : i) * (imageSize + imageGap))

      const image = images[i]
      qdr.drawFittedImage(this.duotoneImage(image, palette), ~~imageX, ~~imageY, imageSize, imageSize)
    }

    qdr.globalAlpha = 1.0

    // Title & subtitle

    qdr.textOverflow = 'ellipsis'
    qdr.fillStyle = palette[0]
    qdr.font = '50px "Montserrat Black, ArialUnicode"'

    qdr.textBaseline = 'hanging'
    qdr.writeTextLine(data.title, duotoneWidth + margin, margin / 2, qdr.width - duotoneWidth - (margin * 2))

    qdr.font = '25px "Montserrat ExtraBold, ArialUnicode"'

    qdr.writeTextLine(data.subtitle, duotoneWidth + margin, margin / 2 + 55, qdr.width - duotoneWidth - (margin * 2))

    // Items text

    const textsX = duotoneWidth + (margin * 3)
    const textsY = (qdr.height - avatarSize) * 0.5
    const textsHeight = (qdr.height - textsY - (margin * 0.4)) / data.items.slice(0, 6).length
    const maxWidthTexts = qdr.width - textsX - (margin * 2) - 10

    for (const i in data.items) {
      if (i > 5) break
      const { name, secondary } = data.items[i]

      const textY = textsY + (textsHeight * i)
      const textContentY = textY + (textsHeight * 0.6)
      const textContentX = textsX + 60

      qdr.textBaseline = 'middle'
      qdr.textAlign = 'center'
      qdr.font = '55px "Montserrat ExtraBold"'
      qdr.writeTextLine(Number(i) + 1, textsX + 25, textY + (textsHeight * 0.5))

      qdr.textAlign = 'left'
      if (secondary) {
        qdr.textBaseline = 'bottom'
        qdr.font = '35px "Montserrat Black, ArialUnicode"'
        qdr.writeTextLine(name, textContentX, textContentY + 2, maxWidthTexts)

        qdr.globalAlpha = 0.8
        qdr.textBaseline = 'top'
        qdr.font = '20px "Montserrat ExtraBold, ArialUnicode"'
        qdr.writeTextLine(secondary, textContentX, textContentY - 2, maxWidthTexts)
        qdr.globalAlpha = 1
      } else {
        qdr.font = '35px "Montserrat Black, ArialUnicode"'
        qdr.writeTextLine(name, textContentX, textY + (textsHeight * 0.5), maxWidthTexts)
      }
    }

    return canvas
  }

  duotoneImage (img, colors) {
    const scale = chroma.scale(colors)
    const canvas = createCanvas(img.width, img.height)
    const qdr = new Quadro(canvas.getContext('2d'), nodeCanvas)

    qdr.drawFittedImage(img, 0, 0, qdr.width, qdr.height)
    qdr.changePixeldata(({
      rgba
    }) => {
      const [r, g, b] = rgba
      const avg = (r + g + b) / 3
      const newColor = scale(avg / 255).rgb(true)
      return [...newColor, 255]
    })

    return canvas
  }
}
