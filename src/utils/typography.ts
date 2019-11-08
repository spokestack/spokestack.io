import Typography from 'typography'
import SpokestackTheme from './typography-theme'
const typography = new Typography(SpokestackTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
export const adjustFontSizeTo = typography.adjustFontSizeTo
export const linesForFontSize = typography.linesForFontSize
export const establishBaseline = typography.establishBaseline
