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
  bodyColor: 'var(--text-color)',
  headerColor: 'var(--header-color)',
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
      color: 'var(--link-color)',
      fontWeight: 700,
      textDecoration: 'underline',
      transition: 'color 0.1s var(--transition-easing)'
    },
    'a:visited': {
      color: 'var(--link-color-visited)'
    },
    'a:hover': {
      color: 'var(--link-color-hover)'
    },
    'a:active': {
      color: 'var(--link-color-active)'
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
