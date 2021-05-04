import React from 'react'
import SVGIcon from './SVGIcon'
import { css, SerializedStyles } from '@emotion/react'

interface Props {
  extraCss?: SerializedStyles | SerializedStyles[]
  slug: string
}

export default function AppStoreButton({ extraCss, slug }: Props) {
  return (
    <a
      href={slug}
      className="btn btn-transparent"
      css={[styles.button].concat(extraCss!)}>
      <SVGIcon icon="#apple" className="icon" extraCss={styles.icon} />
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
    font-size: 18px;
    font-weight: 600;
  `,
  downloadText: css`
    font-size: 10px;
    margin-bottom: -5px;
    font-weight: 400;
  `
}
