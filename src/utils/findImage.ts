const rsrc = /<img[^>]+src=(["'])([:\/\.\w_-]+\.(?:png|jpg|jpeg|webp|gif))\1/
const rhttp = /^https?:\/\//
const rslash = /^\//

export default function findImage(html: string) {
  const match = rsrc.exec(html)
  let src = match && match[2]
  if (src && !rhttp.test(src)) {
    src = 'https://www.spokestack.io/' + src.replace(rslash, '')
  }
  return src
}
