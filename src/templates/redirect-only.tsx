import { PageRendererProps } from 'gatsby'
import { navigate } from 'gatsby'
import { useEffect } from 'react'

type Props = PageRendererProps & {
  // Created by createPage in gatsby-node.js
  pageContext: {
    slug: string
  }
}

export default function RedirectOnly({ pageContext }: Props): null {
  useEffect(() => {
    navigate(pageContext.slug, { replace: true })
  }, [])
  return null
}
