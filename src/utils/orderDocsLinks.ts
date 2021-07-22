import type { StickyLink } from '../components/StickyNavSection'
import nav from '../../content/docs/nav.json'

export interface DocsLinks {
  [key: string]: StickyLink
}

export default function orderDocsLinks(links: DocsLinks) {
  const clonedLinks = { ...links }
  const orderedLinks: StickyLink[] = []
  nav.forEach((item: string | StickyLink) => {
    // External links are arrays
    if (typeof item === 'string') {
      const link = clonedLinks[item]
      if (!link) {
        throw new Error(
          `nav.json specifies navId "${item}", which could not be found in docs.`
        )
      }
      delete clonedLinks[item]
      orderedLinks.push(link)
    } else {
      // If item is not a string,
      // it is expected to be a valid StickyLink object
      orderedLinks.push(item)
    }
  })
  for (const id in clonedLinks) {
    if (clonedLinks.hasOwnProperty(id)) {
      throw new Error(`Doc with navId "${id}" is not in nav.json.`)
    }
  }
  return orderedLinks
}
