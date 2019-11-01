import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { rhythm } from '../utils/typography'
import SocialLinks from './SocialLinks'

const footerQuery = graphql`
  query footerQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
          github
        }
      }
    }
  }
`

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${rhythm(2)};
  padding-left: ${rhythm(1)};
  padding-right: ${rhythm(1)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--main-border-color);
  background-color: var(--main-background);
  color: var(--main-color);

  @media (max-width: 450px) {
    flex-direction: column;
    padding-top: ${rhythm(1)};
    padding-bottom: ${rhythm(1)};
    height: ${rhythm(5)};
  }
  @media (prefers-color-scheme: dark and (max-width: 450px)) {
    height: ${rhythm(6)};
  }
`

const Copyright = styled.div`
  text-align: right;
`

const DarkModeNotice = styled.div`
  display: none;
  font-size: 14px;
  line-height: 1.2;
  margin: 10px 0 5px;

  @media (prefers-color-scheme: dark) {
    display: block;
  }
`

export default function Footer() {
  const { site } = useStaticQuery(footerQuery)
  const { author, social } = site.siteMetadata
  return (
    <Container>
      <SocialLinks social={social} />
      <DarkModeNotice>Detected OS dark mode</DarkModeNotice>
      <Copyright>
        &copy; {new Date().getFullYear()} {author}
      </Copyright>
    </Container>
  )
}
