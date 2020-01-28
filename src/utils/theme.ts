import Color from 'color'

export const primaryColor = Color('#2f5bea')
export const secondaryColor = Color('#61fae9')
export const textColor = Color('#323e48')
export const linkColor = primaryColor

export const mainBackground = '#f6f9fc'
export const primary = primaryColor.hex()
export const secondary = secondaryColor.hex()

export const text = textColor.hex()
export const textLight = textColor.fade(0.5).toString()
export const textError = '#ea2e31'
export const textDarkBg = mainBackground

export const header = '#2c363f'
export const footerBackground = header
export const buttonBackground = secondary
export const buttonBackgroundHover = secondaryColor.darken(0.4).hex()
export const mainBorder = '#e6e9e9'

export const transitionEasing = 'cubic-bezier(0.77, 0.41, 0.2, 0.84)'
export const bubbleEasing = 'cubic-bezier(0.3, 0.55, 0.54, 0.86)'

export const error = '#ea2f5e'
export const codeBackground = '#cce4ff'

export const link = linkColor.hex()
export const linkVisited = linkColor.lighten(0.1).hex()
export const linkHover = linkColor.darken(0.2).hex()
export const linkActive = linkColor.darken(0.4).hex()

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
