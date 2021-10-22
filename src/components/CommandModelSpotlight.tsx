import * as theme from '../styles/theme'

import { CommandModel, CommandModelType } from '../types'
import {
  PipelineConfig,
  PipelineProfile,
  SpeechEvent,
  SpeechEventType,
  startPipeline,
  stopPipeline
} from 'spokestack/client'
import React, { Fragment, useEffect, useState } from 'react'

import Button from './Button'
import Instructions from './Instructions'
import Listening from './Listening'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/react'
import getBaseUrl from '../utils/getBaseUrl'

interface Props {
  model: CommandModel
}

const descriptions = {
  wakeword: (
    <Fragment>
      Test a{' '}
      <a className="link-secondary" href="/features/wake-word">
        wake word model
      </a>{' '}
      by pressing &ldquo;Start test,&rdquo; then saying
      &ldquo;Spokestack&rdquo;. Wait a few seconds for results. This browser
      tester is experimental.
    </Fragment>
  ),
  keyword: (
    <Fragment>
      Test a{' '}
      <a className="link-secondary" href="/features/keyword">
        keyword model
      </a>{' '}
      by pressing &ldquo;Start test,&rdquo; then saying any digit between zero
      and nine. Wait a few seconds for results. This browser tester is
      experimental.
    </Fragment>
  )
}

export default function CommandModelSpotlight({ model }: Props) {
  const [starting, setStarting] = useState(false)
  const [recording, setRecording] = useState(false)
  const [recognized, setRecognized] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState('')
  useEffect(() => {
    stopPipeline()
    setStarting(false)
    setRecording(false)
    setRecognized('')
    setConfidence(0)
    setError('')
  }, [model])
  const isWakeword = model.type === CommandModelType.Wakeword
  const utterances = model.classes!.reduce<string[]>(
    (prev, current) =>
      prev.concat(current!.utterances!.map((utterance) => utterance!.text)!),
    []
  )
  function onEvent(event: SpeechEvent) {
    switch (event.type) {
      case SpeechEventType.Activate:
        // console.log('Activate event', event)
        if (isWakeword) {
          setConfidence(event.confidence!)
          setRecognized('wakeword')
        }
        break
      case SpeechEventType.Recognize:
        // console.log('Recognize event', event)
        setConfidence(event.confidence!)
        setRecognized(event.transcript!)
        break
      case SpeechEventType.Error:
        console.error(event)
        setError(event.error!)
        setRecording(false)
        break
      case SpeechEventType.Deactivate:
      case SpeechEventType.Timeout:
        console.log(`${event.type} event`)
        break
      default:
        console.log('Unhandled SpeechPipeline event', event)
    }
  }
  const baseUrl = getBaseUrl(model.urls)
  const pipelineConfig: PipelineConfig = isWakeword
    ? {
        onEvent,
        profile: PipelineProfile.Wakeword,
        baseUrls: {
          wakeword: baseUrl
        }
      }
    : {
        onEvent,
        profile: PipelineProfile.Keyword,
        baseUrls: {
          keyword: baseUrl
        },
        keywordClasses: model.classes!.map(
          (modelClass) => modelClass!.displayName
        )
      }
  pipelineConfig.workerUrl = '/spokestack-web-worker.js'

  const instructions = [
    'Test a model by pressing "start test" above',
    'Then, try saying any of the utterances listed above. Wait a few seconds after saying an utterance for a confirmation to appear.'
  ]

  return (
    <div css={styles.commandModelSpotlight}>
      <h4 css={styles.header}>
        Try a {isWakeword ? 'Wake Word' : 'Keyword'} in Your Browser
      </h4>
      <p css={styles.description}>
        {isWakeword ? descriptions.wakeword : descriptions.keyword}
      </p>
      <div css={styles.upperContent}>
        <p
          css={styles.success}
          style={{ visibility: recognized ? 'visible' : 'hidden' }}
        >
          {isWakeword
            ? `Activated! Confidence: ${confidence}`
            : `Recognized: \u201c${recognized}\u201d Confidence: ${confidence}`}
        </p>
        {!!error && <p className="error">{error}</p>}
        <Button
          large
          secondary
          extraCss={styles.button}
          onClick={async () => {
            if (recording) {
              stopPipeline()
              setRecording(false)
            } else {
              setStarting(true)
              setRecognized('')
              setConfidence(0)
              setError('')
              try {
                await startPipeline(pipelineConfig)
                setStarting(false)
                setRecording(true)
              } catch (error) {
                console.error(error)
                setStarting(false)
                setError(
                  `There was a problem starting command model testing.
                Note: command model testing uses advanced browser features
                currently only available in Blink browsers such as
                Chrome, Edge, Opera, Vivaldi, and Brave.
                ${(error as Error)?.message || ''}`
                )
              }
            }
          }}
        >
          <span
            css={styles.buttonContent}
            style={{
              visibility: recording ? 'hidden' : 'visible'
            }}
          >
            <SVGIcon icon="#mic" className="icon" extraCss={styles.micIcon} />
            {starting ? 'Starting...' : 'Start test'}
          </span>
          {recording && (
            <Listening
              extraCss={styles.listening}
              dotCss={styles.listeningDots}
            />
          )}
        </Button>
        {utterances.length > 3 ? (
          <Fragment>
            <h5>Say any of the following utterances when testing:</h5>
            <p css={styles.instructions}>{utterances.join(', ')}</p>
          </Fragment>
        ) : (
          <p css={styles.instructions}>
            Say{' '}
            {utterances.reduce<React.ReactNode[]>((prev, current, index) => {
              const add =
                utterances.length > 1 && index === utterances.length - 1 ? (
                  <span key={`${current}-${index}`}>
                    {' '}
                    or <strong>&ldquo;{current}&rdquo;</strong>
                  </span>
                ) : (
                  <span key={`${current}-${index}`}>
                    <strong>&ldquo;{current}&rdquo;</strong>
                  </span>
                )

              return prev.concat(
                utterances.length > 2 && index > 0 ? [', ', add] : add
              )
            }, [])}{' '}
            when testing
          </p>
        )}
      </div>
      <Instructions instructions={instructions} />
      <a
        className="link-secondary"
        css={styles.createLink}
        href={`/account/${isWakeword ? 'wake-word' : 'keyword'}`}
      >
        Create {isWakeword ? 'Wake Word' : 'Keyword'}
        <SVGIcon
          icon="#arrow-forward"
          className="icon"
          extraCss={styles.arrowIcon}
        />
      </a>
    </div>
  )
}

const styles = {
  commandModelSpotlight: css`
    display: flex;
    flex-direction: column;
    color: white;

    padding: 40px;
  `,
  header: css`
    color: white;
    margin: 0 0 25px !important;
  `,
  description: css`
    color: ${theme.grayLight};
  `,
  upperContent: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px 20px 20px;
    background-color: white;
    border-radius: 7px 7px 0 0;
    margin-top: 10px;
    color: ${theme.text};

    h5 {
      margin: 0 0 10px !important;
      color: ${theme.header} !important;
    }
  `,
  button: css`
    margin-bottom: 20px;
  `,
  buttonContent: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  micIcon: css`
    width: 14px;
    height: 14px;
    margin-right: 7px;
    fill: ${theme.text};
  `,
  instructions: css`
    font-size: 14px;
    margin: 0;
  `,
  listening: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  listeningDots: css`
    background-color: ${theme.text};
  `,
  success: css`
    text-align: center;
    color: ${theme.greenDark};
    margin-bottom: 10px;
  `,
  createLink: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
  `,
  arrowIcon: css`
    width: 24px;
    height: 24px;
    margin-left: 7px;
  `
}
