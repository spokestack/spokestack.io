import * as theme from '../../styles/theme'

import { graphql, useStaticQuery } from 'gatsby'

import Callout from '../Callout'
import { Query } from '../../utils/graphql'
import React from 'react'
import { adjustFontSizeTo } from '../../styles/typography'
import { css } from '@emotion/core'
import find from 'lodash/find'

interface Props {
  author: string
  authorHref: string
  date?: string
  header: string
  href?: string
  to?: string
  type: string
}

export default function NewsItem({
  author,
  authorHref,
  date,
  header,
  href,
  to,
  type
}: Props) {
  const data = useStaticQuery<Query>(newsItemQuery)
  const { name, image } = find(data.site.siteMetadata.team, { key: author })
  return (
    <Callout extraCss={styles.callout} href={href} to={to}>
      <div css={styles.title}>
        <h5>{type}</h5>
        <h4>{header}</h4>
      </div>
      <div css={styles.about}>
        <img alt={name} css={styles.image} src={image} />
        <div
          aria-label={header}
          tabIndex={0}
          css={styles.authorLink}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            window.location.href = authorHref
          }}
          onKeyDown={(e) => {
            if (
              !e.shiftKey &&
              !e.altKey &&
              !e.ctrlKey &&
              !e.metaKey &&
              (e.keyCode === 13 || e.keyCode === 32)
            ) {
              e.preventDefault()
              window.location.href = authorHref
            }
          }}>
          {name}
        </div>
        {date && (
          <>
            <div css={styles.separator}>•</div>
            <div>{date}</div>
          </>
        )}
      </div>
    </Callout>
  )
}

const styles = {
  callout: css`
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    width: 290px;
    height: 300px;
    margin: 10px;
  `,
  title: css`
    display: flex;
    flex-direction: column;
    width: 100%;

    h5 {
      margin-bottom: 5px;
    }
  `,
  about: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: ${adjustFontSizeTo('14px').fontSize};
    white-space: nowrap;
  `,
  authorLink: css`
    color: ${theme.link};
    font-weight: 700;
    margin-left: 5px;

    &:visited {
      color: ${theme.linkVisited};
    }
    &:hover {
      color: ${theme.linkHover};
    }
    &:active {
      color: ${theme.linkActive};
    }
  `,
  image: css`
    width: 32px;
    height: 32px;
    border-radius: 50%;
  `,
  separator: css`
    margin: 0 5px;
  `
}

const newsItemQuery = graphql`
  query newsItemQuery {
    site {
      siteMetadata {
        team {
          key
          name
          image
        }
      }
    }
  }
`
