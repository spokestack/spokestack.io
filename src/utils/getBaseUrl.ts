import { CommandModelUrls } from '../types'

const rfilename = /\/[^/]+$/

export default function getBaseUrl(urls: CommandModelUrls) {
  return urls.compressed.replace(rfilename, '/js')
}
