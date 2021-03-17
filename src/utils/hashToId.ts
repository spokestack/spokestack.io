import getHash from './getHash'

const rslash = /^\//
const rslashspace = /[\/\s]+/g

export default function hashToId(href: string) {
  return getHash(href)
    .replace(rslash, '')
    .replace(rslashspace, '-')
    .toLowerCase()
}
