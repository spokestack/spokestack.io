const rhash = /[/#]/g

export default function hashToId(hash: string) {
  return hash.replace(rhash, '')
}
