import * as theme from '../../styles/theme'
import React from 'react'
import { css } from '@emotion/react'

interface Props {
  href: string
  icon: React.ReactNode
  linkText: string
  text: string
}

export default function CommunityHeader({ href, icon, linkText, text }: Props) {
  return (
    <div css={styles.header}>
      <h3>{text}</h3>
      <a href={href} className="link-with-icon" css={styles.link}>
        {icon}
        <span css={styles.linkText}>{linkText}</span>
      </a>
    </div>
  )
}

const styles = {
  header: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;
    padding: 0 10px;
    width: 100%;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: space-between;
      max-width: 1240px;

      h3 {
        margin: 0;
      }
    }
  `,
  link: css`
    font-weight: 400;
  `,
  linkText: css`
    display: inline-block;
    margin-left: 7px;
  `
}
