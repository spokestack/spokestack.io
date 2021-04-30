import Color from 'color'

export const primaryColor = Color('#2f5bea')
export const primaryDarkColor = Color('#0820D6')
export const primaryLightColor = Color('#99caff')
export const primaryLighterColor = Color('#c2dfff')
export const secondaryColor = Color('#61fae9')
export const textColor = Color('#323e48')
export const headerColor = Color('#2c363f')
export const mainBorderColor = Color('#d4d7d9')
export const linkColor = primaryColor
export const linkColorDark = primaryLightColor
export const authorBackgroundColor = Color('#5b6a79')
export const codeBackgroundColor = primaryLighterColor.fade(0.85)

export const primary = primaryColor.hex()
export const primaryDark = primaryDarkColor.hex()
export const primaryLight = primaryLightColor.hex()
export const primaryLighter = primaryLighterColor.hex()
export const secondary = secondaryColor.hex()
export const grayDark = '#c9c9c9'
export const yellow = '#facc5f'
export const green = '#daffcc'
export const greenDark = '#228000'

export const mainBackground = '#f6f9fc'
export const mainBackgroundDark = textColor.hex()
export const stickyNavBackground = 'white'
export const stickyNavBackgroundDark = textColor.darken(0.3).hex()
export const text = textColor.hex()
export const textLight = textColor.fade(0.5).toString()
export const textError = '#ea2e31'
export const textDarkBg = '#ffffff'
export const navFullColumnDark = primaryColor.fade(0.85).toString()

export const header = headerColor.hex()
export const buttonBackground = primary
export const buttonBackgroundHover = primaryColor.darken(0.4).hex()
export const buttonBackgroundDark = primaryLight
export const buttonBackgroundDarkHover = primaryLightColor.darken(0.4).hex()
export const mainBorder = mainBorderColor.hex()
export const mainBorderDark = '#96a2a2'
export const pricingBorder = primaryColor.fade(0.75).toString()
export const pricingBorderHorizontal = `url("data:image/svg+xml,%3csvg width='100%25' height='1' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='4' fill='none' stroke='%23d4d7d9' stroke-width='2' stroke-dasharray='10%2c10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
export const pricingBorderVertical = `url("data:image/svg+xml,%3csvg width='1' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='4' height='100%25' fill='none' stroke='%23d4d7d9' stroke-width='2' stroke-dasharray='10%2c10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`

export const transitionEasing = 'cubic-bezier(0.77, 0.41, 0.2, 0.84)'
export const bubbleEasing = 'cubic-bezier(0.3, 0.55, 0.54, 0.86)'

export const error = '#ea2f5e'
export const codeBackground = codeBackgroundColor.toString()
export const authorBackground = authorBackgroundColor.hex()

export const link = linkColor.hex()
export const linkVisited = linkColor.lighten(0.1).hex()
export const linkHover = linkColor.darken(0.2).hex()
export const linkActive = linkColor.darken(0.4).hex()
export const linkDark = linkColorDark.hex()
export const linkDarkHover = linkColorDark.darken(0.2).hex()
export const linkDarkActive = linkColorDark.darken(0.4).hex()

export const linkSecondary = secondaryColor.hex()
export const linkSecondaryVisited = secondaryColor.lighten(0.1).hex()
export const linkSecondaryHover = secondaryColor.darken(0.4).hex()
export const linkSecondaryActive = secondaryColor.darken(0.6).hex()

export const linkStickyNav = '#8da6e3'
export const linkStickyNavHover = linkHover
export const linkStickyNavActive = link

export const ieBreakpoint =
  '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'

export const ieBreakpointMinDefault =
  '@media all and (-ms-high-contrast: none) and (min-width:980px), (-ms-high-contrast: active) and (min-width:980px)'

export const LARGER_DISPLAY_WIDTH = '1600px'
export const LARGE_DISPLAY_WIDTH = '1280px'
export const DEFAULT_WIDTH = '980px'
export const TABLET_WIDTH = '768px'
export const MOBILE_WIDTH = '480px'

export const MIN_SIDEBAR_WIDTH = '300px'
export const MAX_SIDEBAR_WIDTH = '365px'
export const MIN_TEXT_WIDTH = '608px'
export const MAX_TEXT_WIDTH = '1175px'
export const MAX_BLOG_TEXT_WIDTH = '850px'

/**
 * Responsive media queries
 */
export const LARGER_DISPLAY_MEDIA_QUERY = `@media only screen and (max-width:${LARGER_DISPLAY_WIDTH})`
export const LARGE_DISPLAY_MEDIA_QUERY = `@media only screen and (max-width:${LARGE_DISPLAY_WIDTH})`
export const DEFAULT_MEDIA_QUERY = `@media only screen and (max-width:${DEFAULT_WIDTH})`
export const TABLET_MEDIA_QUERY = `@media only screen and (max-width:${TABLET_WIDTH})`
export const MOBILE_MEDIA_QUERY = `@media only screen and (max-width:${MOBILE_WIDTH})`

export const MIN_LARGER_DISPLAY_MEDIA_QUERY = `@media (min-width:${LARGER_DISPLAY_WIDTH})`
export const MIN_LARGE_DISPLAY_MEDIA_QUERY = `@media (min-width:${LARGE_DISPLAY_WIDTH})`
export const MIN_DEFAULT_MEDIA_QUERY = `@media (min-width:${DEFAULT_WIDTH})`
export const MIN_TABLET_MEDIA_QUERY = `@media (min-width:${TABLET_WIDTH})`
export const MIN_MOBILE_MEDIA_QUERY = `@media (min-width:${MOBILE_WIDTH})`
