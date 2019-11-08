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
      color: '#3D71EF',
      textDecoration: 'none',
      backgroundImage: `linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 1px,
        var(--link-color) 1px,
        var(--link-color) 2px,
        rgba(0, 0, 0, 0) 2px
      )`
    },
    'a:visited': {
      color: '#108ab2'
    },
    'a:hover': {
      color: '#1091bc'
    },
    'a:active': {
      color: '#08485e'
    },
    h4: {
      fontSize: '1.1rem',
      lineHeight: 1.45,
      fontWeight: 400
    },
    h5: {
      fontWeight: 400
    },
    h6: {
      fontWeight: 400
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
