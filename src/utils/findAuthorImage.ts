import { Query } from './graphql'

export default function findAuthorImage(data: Query, author: string) {
  for (const edge of data.allImageSharp.edges) {
    if (edge.node.fixed.originalName.indexOf(author) > -1) {
      return edge.node.fixed
    }
  }
}
