/**
 * Gets the height of text off-screen
 * using the browser's calculations
 */
export default function getContentHeight(
  html: string,
  parent: HTMLElement,
  cssText?: string
) {
  const div = document.createElement('div')
  div.style.cssText = `${cssText};opacity:0;transform:translate(-999px)`
  div.innerHTML = html
  parent.appendChild(div)
  const height = div.getBoundingClientRect().height
  parent.removeChild(div)
  return height
}
