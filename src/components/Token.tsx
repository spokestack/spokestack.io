import { ApiKeySummary } from '../types'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'
import iconDelete from '../icons/delete.svg'
// import iconEye from '../icons/eye.svg'
import iconKey from '../icons/key.svg'

interface Props {
  token: Partial<ApiKeySummary>
}

export default function Token({ token }: Props) {
  return (
    <div css={styles.token}>
      <div css={styles.row}>
        <div css={[styles.iconWrap, styles.keyIconWrap]}>
          <SVGIcon icon={iconKey.id} extraCss={styles.keyIcon} />
        </div>
        <strong>Label:</strong>&nbsp;{token.displayName}
      </div>
      <div css={styles.row}>
        {/* <a href="#" css={styles.iconWrap}>
          <SVGIcon icon={iconEye.id} extraCss={styles.deleteIcon} />
        </a> */}
        <div css={styles.tokenText}>•••••••••••••••••••••••••</div>
        <a href="#" css={styles.iconWrap}>
          <SVGIcon icon={iconDelete.id} extraCss={styles.deleteIcon} />
        </a>
      </div>
    </div>
  )
}

const styles = {
  token: css`
    border: 1px solid var(--main-border-color);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 20px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `,
  iconWrap: css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s var(--transition-easing);

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
    }
  `,
  keyIcon: css`
    fill: var(--text-color);
    width: 20px;
    height: 20px;
  `,
  keyIconWrap: css`
    pointer-events: none;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  tokenText: css`
    margin: 0 5px;
  `,
  deleteIcon: css`
    fill: var(--primary-color);
    width: 20px;
    height: 20px;
  `
}
