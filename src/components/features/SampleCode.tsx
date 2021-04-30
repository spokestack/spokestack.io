import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../../styles/theme'
import Configurator, { ConfiguratorProps } from '../Configurator'
import SVGIcon from '../SVGIcon'

function SampleCodeCheck({ text }: { text: string }) {
  return (
    <div css={styles.sampleCodeCheck}>
      <div css={styles.sampleCheckmark}>
        <SVGIcon icon="#checkmark" css={styles.checkmarkIcon} />
      </div>
      {text}
    </div>
  )
}

interface Props {
  codeKey: ConfiguratorProps['codeKey']
  title: string
}

export default function SampleCode({ codeKey, title }: Props) {
  return (
    <section css={styles.sampleCode}>
      <div css={styles.description}>
        <h2>{title}</h2>
        <p className="title">
          For mobile apps, integrate{' '}
          <a className="link-secondary" href="/docs/concepts/tray">
            Spokestack Tray
          </a>
          , a drop-in UI widget that manages voice interactions and delivers
          actionable user commands with just a few lines of code.
        </p>
        <div css={styles.checklist}>
          <SampleCodeCheck text="Sample code and tutorials" />
          <SampleCodeCheck text="Complete API and SDK documentation" />
          <SampleCodeCheck text="Low-code integrations on popular platforms including:" />
          <div css={styles.checklistCols}>
            <div css={styles.checklistCol}>
              <SampleCodeCheck text="Alexa" />
              <SampleCodeCheck text="Jovo" />
              <SampleCodeCheck text="Hugging Face" />
            </div>
            <div css={styles.checklistCol}>
              <SampleCodeCheck text="DialogFlow" />
              <SampleCodeCheck text="Siri" />
              <SampleCodeCheck text="Google Assistant" />
            </div>
          </div>
        </div>
      </div>
      <Configurator codeKey={codeKey} extraCss={styles.configurator} />
    </section>
  )
}

const styles = {
  sampleCode: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #232b32;
    color: white;
    padding: 20px;

    a {
      font-weight: 400;
    }

    h2,
    h3,
    h4,
    h5,
    .title {
      color: white;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      flex-direction: row;
      padding: 100px;
    }
  `,
  checklist: css`
    display: flex;
    flex-direction: column;
  `,
  checklistCols: css`
    display: flex;
    flex-direction: row;
  `,
  checklistCol: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 0 0 0 40px;
    }
  `,
  description: css`
    padding-bottom: 20px;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      width: calc(50% - 75px);
      margin-right: 100px;
    }
  `,
  configurator: css`
    width: 100%;
    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      width: calc(50% - 25px);
    }
  `,
  sampleCodeCheck: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.secondary};
    font-weight: 700;
    padding: 10px;
  `,
  sampleCheckmark: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: ${theme.secondary};
    margin-right: 10px;
    padding-top: 1px;
    flex-shrink: 0;
  `,
  checkmarkIcon: css`
    width: 22px;
    height: 22px;
    fill: #232b32;
  `
}
