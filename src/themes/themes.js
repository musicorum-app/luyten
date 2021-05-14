import DuotoneTheme from './duotone'
import TopsTheme from './tops'
import DarklyTheme from './darkly'

export default (ctx) => ({
  duotone: new DuotoneTheme(ctx),
  tops: new TopsTheme(ctx),
  darkly: new DarklyTheme(ctx)
})
