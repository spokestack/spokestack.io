// custom typefaces
import 'prismjs/themes/prism-tomorrow.css'

export { default as wrapRootElement } from './src/apollo/wrapRootElement'

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    import('intersection-observer')
    console.log('# IntersectionObserver is polyfilled!')
  }
}
