import { PageRendererProps } from 'gatsby'
import { navigate } from 'gatsby'
import { useEffect } from 'react'
import { PageContext } from '../types'

type Props = PageRendererProps & {
  // Created by createPage in gatsby-node.js
  pageContext: PageContext
}

export default function RedirectOnly({ pageContext }: Props): null {
  useEffect(() => {
    navigate(pageContext.slug, { replace: true })
  }, [])
  return null
}
