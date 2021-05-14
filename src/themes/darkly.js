import Theme from '../Theme'
import nodeCanvas from 'canvas'
import { Quadro } from '@musicorum/quadro'

export default class DarklyTheme extends Theme {
  constructor (data) {
    super('darkly', data)
  }

  async render ({
    id,
    hide_username: hideUsername,
    user,
    data
  }) {
    const canvas = nodeCanvas.createCanvas(840, 920)
    const ctx = canvas.getContext('2d')
    const qdr = new Quadro(ctx, nodeCanvas)

    qdr.fillStyle = '#000'
    qdr.fillRect(0, 0, qdr.width, qdr.height)

    return canvas
  }
}
