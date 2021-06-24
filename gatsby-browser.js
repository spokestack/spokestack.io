import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import './src/utils/closest-polyfill.js'

import { getDarkModePref } from './src/utils/darkMode'

const rdark = /^\/(?:docs|blog|tutorials)/

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    import('intersection-observer')
    console.log('IntersectionObserver is polyfilled!')
  }
}

export const onRouteUpdate = ({ location }) => {
  const html = document.querySelector('html')
  if (!html) {
    return
  }
  if (rdark.test(location.pathname) && getDarkModePref()) {
    html.classList.add('dark-mode')
  } else {
    html.classList.remove('dark-mode')
  }
}
