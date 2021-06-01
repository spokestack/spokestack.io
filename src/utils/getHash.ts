const rhash = /[^#]*?#/g

export default function getHash(path: string) {
  return path.replace(rhash, '')
}
