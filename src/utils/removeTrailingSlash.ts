const rtrailing = /\/$/
export default function removeTrailingSlash(url: string) {
  return url.replace(rtrailing, '')
}
