import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { TypographyOptions } from 'typography'
import * as theme from '../utils/theme'

const options: TypographyOptions = {
  // title: 'Spokestack',
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  googleFonts: [
    {
      name: 'Roboto',
      styles: ['400', '700']
    }
  ],
  headerFontFamily: ['Roboto', 'Georgia', 'sans-serif'],
  bodyFontFamily: ['Roboto', 'Georgia', 'sans-serif'],
  bodyColor: theme.text,
  headerColor: theme.header,
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ scale, rhythm }) => ({
    html: {
      '-webkit-font-smoothing': 'antialiased'
    },
    body: {
      letterSpacing: '.03em'
    },
    a: {
      color: theme.link,
      fontWeight: 700,
      textDecoration: 'underline',
      textDecorationColor: theme.link,
      textDecorationThickness: '.1em',
      textUnderlineOffset: '2px',
      transition: `color 0.1s ${theme.transitionEasing}`
    },
    'a:visited': {
      color: theme.linkVisited,
      textDecorationColor: theme.linkVisited
    },
    'a:hover': {
      color: theme.linkHover,
      textDecorationColor: theme.linkHover
    },
    'a:active': {
      color: theme.linkActive,
      textDecorationColor: theme.linkActive
    },
    h1: {
      fontSize: `${42 / 18}rem`,
      marginBottom: rhythm(0.8)
    },
    h2: {
      fontSize: `${33 / 18}rem`,
      lineHeight: 1.45,
      marginBottom: rhythm(0.8)
    },
    h3: {
      fontSize: `${28 / 18}rem`,
      lineHeight: 1.45,
      marginBottom: rhythm(0.8)
    },
    h4: {
      fontSize: `${23 / 18}rem`,
      lineHeight: 1.45,
      marginBottom: rhythm(0.8)
    },
    h5: {
      fontSize: '1rem',
      margin: 0
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
      margin: 0
    },
    form: {
      margin: 0
    },
    blockquote: {
      ...scale(1 / 5),
      color: 'hsl(0, 0%, 40%)',
      paddingLeft: rhythm(13 / 16),
      marginLeft: rhythm(-1),
      borderLeft: `${rhythm(3 / 16)} solid ${'hsl(0, 0%, 13%)'}`
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        paddingLeft: rhythm(9 / 16),
        marginRight: 0
      }
    }
  })
}

export default options
