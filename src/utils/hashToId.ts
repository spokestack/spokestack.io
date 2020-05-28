const rslash = /^\//
const rslashspace = /[\/\s]+/g
const rhash = /[^#]*?[/#]/g

export default function hashToId(hash: string) {
  return hash
    .replace(rslash, '')
    .replace(rslashspace, '-')
    .replace(rhash, '')
    .toLowerCase()
}
