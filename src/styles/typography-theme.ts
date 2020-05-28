import * as theme from './theme'

import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { TypographyOptions } from 'typography'

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
      textUnderlineOffset: '2px'
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
      fontSize: `${36 / 18}rem`,
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
      fontSize: '0.8rem',
      fontWeight: 400,
      fontStyle: 'italic',
      margin: `${rhythm(1)} 0 ${rhythm(0.8)}`
    },
    form: {
      margin: 0
    },
    figcaption: {
      fontSize: '0.9rem',
      fontStyle: 'italic',
      paddingLeft: rhythm(1 / 3),
      paddingRight: rhythm(1 / 3),
      margin: '0 auto',
      textAlign: 'center'
    },
    blockquote: {
      ...scale(1 / 5),
      paddingLeft: rhythm(1),
      marginLeft: 0,
      paddingTop: rhythm(1 / 3),
      paddingBottom: rhythm(1 / 3),
      borderLeft: `${rhythm(3 / 16)} solid ${theme.primaryLight}`,
      fontStyle: 'italic'
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
