import SpokestackTheme from './typography-theme'
import Typography from 'typography'
const typography = new Typography(SpokestackTheme)

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
export const adjustFontSizeTo = typography.adjustFontSizeTo
export const linesForFontSize = typography.linesForFontSize
export const establishBaseline = typography.establishBaseline
