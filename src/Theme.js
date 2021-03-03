import path from 'path'
import { promises as fs } from 'fs'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import { existsAsync, hash } from './utils'
import { loadImage } from 'canvas'
import fetch from 'node-fetch'

export default class Theme {
  constructor (name, {
    logger,
    config
  }) {
    this.logger = logger
    this.config = config
    this.name = name
  }

  async generate (options) {
    const canvas = await (options.story ? this.renderStory(options) : this.render(options))

    const exportPath = path.resolve(__dirname, '..', this.config.export_path, `${options.id}.webp`)

    const buff = await imagemin.buffer(await canvas.toBuffer(), {
      plugins: [
        imageminWebp({
          quality: 90
        })
      ]
    })

    await fs.writeFile(exportPath, buff)
    return {
      file: exportPath
    }
  }

  async loadImage (url) {
    const fileName = hash(url) + '.jpg'
    const filePath = path.resolve(__dirname, '..', this.config.media_path, `${fileName}.jpg`)

    if (await existsAsync(filePath)) {
      return loadImage(filePath)
    } else {
      const buff = await fetch(url).then(r => r.buffer())
      fs.writeFile(filePath, buff)
      return loadImage(buff)
    }
  }

  async render () {
    throw new Error(`The render() function of ${this.name} isn't implemented.`)
  }

  async renderStory () {
    throw new Error(`The renderStory() function of ${this.name} isn't implemented.`)
  }
}
