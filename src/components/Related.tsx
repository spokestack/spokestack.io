import * as theme from '../styles/theme'
import React from 'react'
import { css } from '@emotion/react'
import { PageContext, Link as LinkType } from '../types'
import FooterCard from './docs/FooterCard'
import SVGIcon from './SVGIcon'
import { Link } from 'gatsby'

interface Props {
  description: string
  githubLink: string
  related?: PageContext['related']
  videos?: LinkType[]
}

const LightIcon = () => (
  <SVGIcon
    icon="#light"
    className="icon"
    extraCss={css`
      width: 14px;
      height: 16px;
      margin-right: 7px;
    `}
  />
)

export default function Related({
  description,
  githubLink,
  related,
  videos = []
}: Props) {
  const tutorials = related?.tutorials || []
  const blog = related?.blog || []
  const docs = related?.docs || []
  return (
    <div css={styles.related}>
      {!!(tutorials.length || blog.length || videos.length) && (
        <div css={styles.blogRelated}>
          <div className="dashed-border-top" css={styles.cards}>
            <h2>Related Resources</h2>
            <p>{description}</p>
            {!!tutorials.length && (
              <FooterCard header="Explore Related Tutorials">
                {tutorials.map((link, i) => (
                  <Link
                    css={styles.relatedLink}
                    key={`related-tutorials-${i}`}
                    to={link.href}
                  >
                    <LightIcon />
                    {link.title}
                  </Link>
                ))}
              </FooterCard>
            )}
            {!!blog.length && (
              <FooterCard header="Explore Related Blog Posts">
                {blog.map((link, i) => (
                  <Link
                    css={styles.relatedLink}
                    key={`related-blog-${i}`}
                    to={link.href}
                  >
                    <LightIcon />
                    {link.title}
                  </Link>
                ))}
              </FooterCard>
            )}
            {!!videos.length && (
              <FooterCard header="Explore Related Videos">
                {videos.map((link, i) => (
                  <Link
                    css={styles.relatedLink}
                    key={`related-videos-${i}`}
                    to={link.href}
                  >
                    <LightIcon />
                    {link.title}
                  </Link>
                ))}
              </FooterCard>
            )}
          </div>
        </div>
      )}
      <div className="dashed-border-top" css={styles.cards}>
        {!!docs.length && (
          <FooterCard header="Explore Related Docs">
            <div css={styles.relatedLinks}>
              {docs.map((link, i) => (
                <Link
                  css={styles.relatedLink}
                  key={`related-docs-${i}`}
                  to={link.href}
                >
                  <SVGIcon
                    icon="#file"
                    className="icon"
                    extraCss={css`
                      width: 14px;
                      height: 16px;
                      margin-right: 7px;
                    `}
                  />
                  {link.title}
                </Link>
              ))}
            </div>
          </FooterCard>
        )}
        <div css={styles.columnCards}>
          <FooterCard header="Something Missing?">
            <a href={githubLink} rel="noopener noreferrer" target="_blank">
              <SVGIcon
                icon="#edit"
                className="icon"
                extraCss={css`
                  width: 15px;
                  height: 15px;
                  margin-right: 7px;
                `}
              />
              Edit this doc!
            </a>
          </FooterCard>
          <FooterCard header="Questions?">
            <a className="forum-link" href="https://forum.spokestack.io/">
              <SVGIcon
                icon="#support"
                className="icon"
                extraCss={styles.forumIcon}
              />
              Visit our forum
            </a>
          </FooterCard>
        </div>
      </div>
    </div>
  )
}

const styles = {
  related: css`
    padding-top: 25px;
  `,
  blogRelated: css`
    display: flex;
    flex-direction: column;

    h2 {
      margin-top: 0;
    }
  `,
  cards: css`
    display: flex;
    flex-direction: column;
    padding: 40px 0;
  `,
  columnCards: css`
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    .footer-card {
      margin-top: 0 !important;

      :nth-of-type(2n) {
        margin-left: 10px;
      }
    }
  `,
  relatedLinks: css`
    display: flex;
    flex-direction: column;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      flex-wrap: wrap;

      a {
        width: calc(50% - 5px);
        margin-top: 0 !important;

        &:nth-of-type(2n) {
          margin-left: 10px;
        }
        &:nth-of-type(n + 3) {
          margin-top: 10px !important;
        }
      }
    }
  `,
  relatedLink: css`
    & + & {
      margin-top: 10px;
    }
  `,
  forumIcon: css`
    width: 14px;
    height: 14px;
    margin-right: 7px;
  `
}
