import * as theme from '../../styles/theme'

import {
  NluModelSource,
  NluModelState,
  NluModel as NluModelType
} from '../../types'

import AccountCard from './AccountCard'
import Color from 'color'
import { CopyInputWithButton } from '../EditButtons'
import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/core'
import { formatDate } from '../../utils/formatDate'
import { titleCase } from 'title-case'

interface Props {
  model: NluModelType
}

const rurlFilename = /\/[^/]+?$/

export default function NluModel({ model }: Props) {
  const isShared = model.source === NluModelSource.SHARED
  const isPending = model.state === NluModelState.PENDING
  const modelFolder = model.modelUrl?.replace(rurlFilename, '')
  return (
    <AccountCard
      title={titleCase(model.name)}
      rightContent={
        !isShared &&
        !!model.insertedAt && (
          <p css={styles.date}>{`Imported ${formatDate(model.insertedAt)}`}</p>
        )
      }>
      <p>
        This model is{' '}
        {isShared
          ? 'shared. It is available to all Spokestack accounts.'
          : 'only available to your account.'}
      </p>
      {!!modelFolder && (
        <>
          <CopyInputWithButton
            id={`vocab-${model.id}`}
            extraCss={styles.copyInput}
            title="vocab.txt CDN URL"
            value={`${modelFolder}/vocab.txt`}
          />
          <CopyInputWithButton
            id={`nlu-${model.id}`}
            extraCss={styles.copyInput}
            title="nlu.tflite CDN URL"
            value={`${modelFolder}/nlu.tflite`}
          />
          <CopyInputWithButton
            id={`metadata-${model.id}`}
            extraCss={styles.copyInput}
            title="metadata.json CDN URL"
            value={`${modelFolder}/metadata.json`}
          />
          <div css={styles.buttons}>
            <a
              className="btn btn-transparent"
              download="download"
              href={model.modelUrl}>
              <SVGIcon
                icon="#download"
                className="icon"
                extraCss={styles.downloadIcon}
              />
              Download All
            </a>
          </div>
        </>
      )}
      {isPending && (
        <div css={styles.pending}>
          <SVGIcon icon="#time" css={styles.timeIcon} />
          Pending
        </div>
      )}
    </AccountCard>
  )
}

const styles = {
  date: css`
    margin: 0;
    font-size: 16px;
  `,
  copyInput: css`
    margin-bottom: 20px;
  `,
  buttons: css`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  `,
  downloadIcon: css`
    width: 24px;
    height: 24px;
    margin-right: 5px;
  `,
  pending: css`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.primary};
    font-weight: 700;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${Color('#cce4ff').fade(0.1).toString()};
    z-index: 1;
  `,
  timeIcon: css`
    width: 18px;
    height: 18px;
    fill: ${theme.primary};
    margin-right: 5px;
  `
}
