import React from 'react'
import AboutLayout from '../../components/AboutLayout'
import { PageRendererProps, graphql } from 'gatsby'
import { Query } from '../../utils/graphql'
import Investor from '../../components/Investor'

interface Props extends PageRendererProps {
  data: Query
}

export default function Investors({ data, location }: Props) {
  const investors = data.site.siteMetadata.investors
  return (
    <AboutLayout location={location}>
      <h2>Investors &amp; Advisors</h2>
      {investors.map((investor) => (
        <Investor key={investor.name} {...investor} />
      ))}
    </AboutLayout>
  )
}

export const pageQuery = graphql`
  query investorsQuery {
    site {
      siteMetadata {
        investors {
          name
          titles {
            title
            company
          }
        }
      }
    }
  }
`
