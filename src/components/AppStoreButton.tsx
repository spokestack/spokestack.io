import React from 'react'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'

interface Props {
  slug: string
}

export default function AppStoreButton({ slug }: Props) {
  return (
    <a href={slug} className="btn" css={styles.button}>
      <SVGIcon icon="#apple" extraCss={styles.icon} />
      <div css={styles.text}>
        <div css={styles.downloadText}>Download on the</div>
        <div>App Store</div>
      </div>
    </a>
  )
}

const styles = {
  button: css`
    padding-left: 40px;
    padding-right: 40px;
  `,
  icon: css`
    width: 20px;
    height: 24px;
    margin-right: 10px;
  `,
  text: css`
    display: flex;
    flex-direction: column;
  `,
  downloadText: css`
    font-size: 10px;
    margin-bottom: -5px;
  `
}
