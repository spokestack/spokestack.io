const rspaces = /\s+/g

export default function toUrl(str: string) {
  return str.toLowerCase().replace(rspaces, '-')
}
