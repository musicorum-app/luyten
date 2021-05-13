import Theme from '../Theme'
import nodeCanvas from 'canvas'
import { Quadro } from '@musicorum/quadro'

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

    // qdr.globalAlpha = 0.5

    qdr.imageFit = 'cover'
    qdr.drawImage(avatarImage, 0, 0, qdr.width, qdr.height)
    qdr.blurArea(0, 0, qdr.width, qdr.height, 25)

    qdr.fillStyle = 'rgba(0, 0, 0, 0.5)'
    qdr.fillRect(0, 0, qdr.width, qdr.height)

    return canvas
  }
}
