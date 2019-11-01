import styled from '@emotion/styled'
import React from 'react'

const SocialList = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  list-style: none;
  margin: 0;
`

const SocialLi = styled.li`
  margin: 0 10px 0 0;
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--main-border-color);
  border-radius: 3px;
  background-image: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    background-image: none;
  }
  &:active {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`

const SVGIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: inline-block;
  fill: #828282;
  line-height: 0;

  @media (prefers-color-scheme: dark) {
    fill: white;
  }
`

interface Props {
  social: {
    github: string
    twitter: string
    rss: string
  }
}

export default function SocialLinks({ social }: Props) {
  return (
    <SocialList>
      <SocialLi>
        <SocialLink href={`https://github.com/${social.github}`} title="GitHub">
          <SVGIcon
            dangerouslySetInnerHTML={{
              __html: '<use xlink:href="/minima-social-icons.svg#github"></use>'
            }}
          />
        </SocialLink>
      </SocialLi>
      <SocialLi>
        <SocialLink href={`https://twitter.com/${social.twitter}`} title="Twitter">
          <SVGIcon
            dangerouslySetInnerHTML={{
              __html: '<use xlink:href="/minima-social-icons.svg#twitter"></use>'
            }}
          />
        </SocialLink>
      </SocialLi>
      <SocialLi>
        <SocialLink href="/rss.xml" title="RSS">
          <SVGIcon
            dangerouslySetInnerHTML={{
              __html: '<use xlink:href="/minima-social-icons.svg#rss"></use>'
            }}
          />
        </SocialLink>
      </SocialLi>
    </SocialList>
  )
}
