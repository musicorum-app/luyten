import Theme from '../Theme'
import nodeCanvas from 'canvas'
import { Quadro } from '@musicorum/quadro'
import * as StackBlur from 'stackblur-canvas'
import {STORY_HEIGHT, STORY_WIDTH} from "../constants";

export default class TopsTheme extends Theme {
  constructor (data) {
    super('tops', data)
  }

  async render ({
    id,
    hide_username: hideUsername,
    user,
    data
  }) {
    const canvas = nodeCanvas.createCanvas(740, 400)
    const ctx = canvas.getContext('2d')
    const qdr = new Quadro(ctx, nodeCanvas)

    const avatarImage = await qdr.loadImage(user.image)
    const images = await Promise.all(data.items.map(i => qdr.loadImage(i.image)))

    // Background
    qdr.imageFit = 'cover'
    qdr.drawImage(avatarImage, 0, 0, qdr.width, qdr.height)

    StackBlur.canvasRGB(canvas, 0, 0, qdr.width, qdr.height, 30)

    qdr.fillStyle = 'rgba(0, 0, 0, 0.5)'
    qdr.fillRect(0, 0, qdr.width, qdr.height)

    // Main image
    const mainImageY = 170
    qdr.xAlign = 'center'
    qdr.yAlign = 'center'
    qdr.drawCircleImage(avatarImage, qdr.width / 2, mainImageY, 188)

    // Texts
    qdr.fillStyle = '#fff'
    qdr.font = '38px "Poppins Medium"'
    qdr.textAlign = 'center'
    qdr.textBaseline = 'middle'
    qdr.textOverflow = 'ellipsis'
    qdr.writeTextLine(data.title, qdr.width / 2, 75 / 2, qdr.width)

    if (!hideUsername) {
      qdr.font = '26px "Poppins Black"'
      qdr.textBaseline = 'top'
      qdr.writeTextLine(user.name || user.username, qdr.width / 2, mainImageY + 188 / 2 + 4, 188)
    }

    qdr.font = '32px "Poppins Black"'
    qdr.textBaseline = 'middle'

    qdr.writeTextLine(data.scrobbles, qdr.width / 2, 351, qdr.width)

    qdr.font = '15px "Poppins"'
    qdr.fillStyle = 'rgba(255, 255, 255, 0.7)'
    qdr.writeTextLine(data.scrobbles_text, qdr.width / 2, 377, qdr.width)

    // Items
    const itemMargin = 46
    const itemSize = 168
    const textMaxWidth = 248
    const textMargin = 6
    const itemY = 178

    qdr.xAlign = qdr.yAlign = 'center'

    for (let i = 0; i < 2; i++) {
      const item = data.items[i]
      const itemX = i ? qdr.width - itemMargin - itemSize / 2 : itemMargin + itemSize / 2

      // Texts
      qdr.textBaseline = 'bottom'
      qdr.font = '15px "Poppins Medium"'
      qdr.fillStyle = 'rgba(255, 255, 255, 0.7)'
      qdr.writeTextLine(item.title, itemX, itemY - itemSize / 2 - textMargin, textMaxWidth)

      qdr.textBaseline = 'top'

      if (item.secondary) {
        qdr.writeTextLine(item.secondary, itemX, itemY + itemSize / 2 + textMargin + 25, textMaxWidth)
      }

      qdr.font = '19px "Poppins SemiBold"'
      qdr.fillStyle = '#fff'
      qdr.writeTextLine(item.name, itemX, itemY + itemSize / 2 + textMargin, textMaxWidth)

      qdr.drawImage(images[i], itemX, itemY, itemSize, itemSize)
    }

    return canvas
  }

  async renderStory ({
    id,
    hide_username: hideUsername,
    user,
    data
  }) {
    const canvas = nodeCanvas.createCanvas(STORY_WIDTH, STORY_HEIGHT)
    const ctx = canvas.getContext('2d')
    const qdr = new Quadro(ctx, nodeCanvas)

    const avatarImage = await qdr.loadImage(user.image)
    const images = await Promise.all(data.items.map(i => qdr.loadImage(i.image)))

    // Background
    qdr.imageFit = 'cover'
    qdr.drawImage(avatarImage, 0, 0, qdr.width, qdr.height)
    StackBlur.canvasRGB(canvas, 0, 0, qdr.width, qdr.height, 90)

    qdr.fillStyle = 'rgba(0, 0, 0, 0.5)'
    qdr.fillRect(0, 0, qdr.width, qdr.height)

    // Main image
    const mainImageY = 380
    const mainImageSize = 530

    qdr.xAlign = 'center'
    qdr.yAlign = 'center'
    qdr.drawCircleImage(avatarImage, qdr.width / 2, mainImageY, mainImageSize)

    // Texts
    qdr.fillStyle = '#fff'
    qdr.font = '50px "Poppins Medium"'
    qdr.textAlign = 'center'
    qdr.textBaseline = 'middle'
    qdr.textOverflow = 'ellipsis'
    qdr.writeTextLine(data.title, qdr.width / 2, (mainImageY - mainImageSize / 2) / 2, qdr.width - 50)

    if (!hideUsername) {
      qdr.font = '58px "Poppins Black"'

      const measure = ctx.measureText(user.name || user.username)
      if (measure.width > qdr.width / 2) {
        qdr.font = '42px "Poppins Black"'
      }
      qdr.textBaseline = 'top'
      qdr.writeTextLine(user.name || user.username, qdr.width / 2, mainImageY + mainImageSize / 2, qdr.width - 50)
    }

    qdr.font = '48px "Poppins Black"'
    qdr.textBaseline = 'middle'

    qdr.writeTextLine(data.scrobbles, qdr.width / 2, 790, qdr.width)

    qdr.textBaseline = 'top'
    qdr.font = '29px "Poppins"'
    qdr.fillStyle = 'rgba(255, 255, 255, 0.7)'
    qdr.writeTextLine(data.scrobbles_text, qdr.width / 2, 803, qdr.width)

    // Items
    const itemSize = 270
    const itemMargin = (qdr.width - itemSize * 2) / 3
    const textMaxWidth = itemSize * 1.1
    const textMargin = 3
    const itemY = 1040

    qdr.xAlign = qdr.yAlign = 'center'

    for (let i = 0; i < 2; i++) {
      const item = data.items[i]
      const itemX = i ? qdr.width - itemMargin - itemSize / 2 : itemMargin + itemSize / 2

      // Texts
      qdr.textBaseline = 'bottom'
      qdr.font = '24px "Poppins Medium"'
      qdr.fillStyle = 'rgba(255, 255, 255, 0.7)'
      qdr.writeTextLine(item.title, itemX, itemY - itemSize / 2 - textMargin, textMaxWidth)

      qdr.textBaseline = 'top'

      if (item.secondary) {
        qdr.font = '21px "Poppins Medium"'
        qdr.writeTextLine(item.secondary, itemX, itemY + itemSize / 2 + textMargin + 35, textMaxWidth)
      }

      qdr.font = '29px "Poppins SemiBold"'
      qdr.fillStyle = '#fff'
      qdr.writeTextLine(item.name, itemX, itemY + itemSize / 2 + textMargin, textMaxWidth)

      qdr.drawImage(images[i], itemX, itemY, itemSize, itemSize)
    }

    return canvas
  }
}
