import DuotoneTheme from './duotone'
import TopsTheme from './tops'

export default (ctx) => ({
  duotone: new DuotoneTheme(ctx),
  tops: new TopsTheme(ctx)
})
