import { registerFont } from 'canvas'
import * as path from 'path'

const ASSETS_SRC = path.resolve(__dirname, '..', 'assets')

export default () => {
  // Unicode fallback
  registerFont(ASSETS_SRC + '/fonts/Arial-Unicode-MS.ttf', { family: 'ArialUnicode' })

  // Montserrat
  registerFont(ASSETS_SRC + '/fonts/Montserrat-Black.ttf', { family: 'Montserrat', weight: 'black' })
  registerFont(ASSETS_SRC + '/fonts/Montserrat-Bold.ttf', { family: 'Montserrat', weight: 'bold' })
  registerFont(ASSETS_SRC + '/fonts/Montserrat-ExtraBold.ttf', { family: 'Montserrat', weight: 'extrabold' })

  // Poppins
  registerFont(ASSETS_SRC + '/fonts/Poppins-Regular.ttf', { family: 'Poppins' })
  registerFont(ASSETS_SRC + '/fonts/Poppins-Medium.ttf', { family: 'Poppins', weight: 'medium' })
  registerFont(ASSETS_SRC + '/fonts/Poppins-SemiBold.ttf', { family: 'Poppins', weight: 'semibold' })
  registerFont(ASSETS_SRC + '/fonts/Poppins-Bold.ttf', { family: 'Poppins', weight: 'bold' })
  registerFont(ASSETS_SRC + '/fonts/Poppins-Black.ttf', { family: 'Poppins', weight: 'black' })
}
