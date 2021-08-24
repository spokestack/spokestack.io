import * as theme from '../styles/theme'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SYNTHESIZE_MARKDOWN, SYNTHESIZE_SSML } from '../apollo/queries'
import { sanitizeIPA, swapIPA } from '../utils/ipa'

import Button from './Button'
import SVGIcon from './SVGIcon'
import { SynthesisResult } from '../types'
import Textarea from './Textarea'
import createClient from '../apollo/createClient'
import { css } from '@emotion/react'
import debounce from 'lodash/debounce'

export default function TTSSpotlight() {
  const [error, setError] = useState('')
  const [playing, setPlaying] = useState(false)
  const [speechMarkdown, setSpeechMarkdown] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [text, setText] = useState(
    'Hello, welcome to {{spoʊkstæk}}. What would you like to say?'
  )
  const audioRef = useRef<HTMLAudioElement>(null)
  const audio = audioRef.current

  function getAudio(text: string, markdown: boolean) {
    if (!text) {
      return
    }
    setSubmitting(true)
    setError('')
    const client = createClient()
    const query = markdown
      ? client
          .query<{ synthesizeMarkdown: SynthesisResult }>({
            query: SYNTHESIZE_MARKDOWN,
            variables: {
              markdown: text,
              voice: 'demo-male'
            },
            fetchPolicy: 'network-only'
          })
          .then(({ data }) => data.synthesizeMarkdown)
      : client
          .query<{ synthesizeSsml: SynthesisResult }>({
            query: SYNTHESIZE_SSML,
            variables: {
              ssml: sanitizeIPA(text),
              voice: 'demo-male'
            },
            fetchPolicy: 'network-only'
          })
          .then(({ data }) => data.synthesizeSsml)
    query
      .then(({ url }) => {
        if (!audio) {
          return
        }
        if (playing) {
          audio.pause()
        }
        audio.src = url
        audio.load()
      })
      .catch((error) => {
        setDisabled(false)
        setSubmitting(false)
        setError(
          error.message ||
            'There was a problem synthesizing the text. Please try again.'
        )
      })
  }

  const getAudioDebounced = useCallback(debounce(getAudio, 1000), [audio])
  useEffect(() => {
    if (audio) {
      getAudioDebounced(text, speechMarkdown)
    }
  }, [audio, text, speechMarkdown])

  useEffect(() => {
    if (!audio) {
      return
    }
    function onError(event: ErrorEvent) {
      console.error(event)
      setDisabled(false)
      setSubmitting(false)
      setError(
        'There was a problem synthesizing the given text and voice combination. Please refresh and try again.'
      )
    }
    function canPlay() {
      setDisabled(false)
      setSubmitting(false)
    }
    function played() {
      setPlaying(true)
    }
    function paused() {
      setPlaying(false)
    }
    audio.addEventListener('error', onError)
    audio.addEventListener('canplaythrough', canPlay)
    audio.addEventListener('play', played)
    audio.addEventListener('pause', paused)
    audio.addEventListener('ended', paused)

    return () => {
      audio.removeEventListener('error', onError)
      audio.removeEventListener('canplaythrough', canPlay)
      audio.removeEventListener('play', played)
      audio.removeEventListener('pause', paused)
      audio.removeEventListener('ended', paused)
    }
  }, [audio])

  return (
    <div css={styles.ttsSpotlight}>
      <audio ref={audioRef} />
      <h4 css={styles.header}>Try an AI Voice Clone in Your Browser</h4>
      <p css={styles.description}>
        Synthesize any text using our free Spokestack voice below. We support{' '}
        <a
          className="link-secondary"
          href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">
          IPA
        </a>{' '}
        input enclosed in {`{{ double braces }}`}, or a subset of{' '}
        <a className="link-secondary" href="https://www.speechmarkdown.org/">
          Speech Markdown
        </a>{' '}
        including{' '}
        <a
          className="link-secondary"
          href="https://www.speechmarkdown.org/syntax/break/">
          breaks
        </a>
        ,{' '}
        <a
          className="link-secondary"
          href="https://www.speechmarkdown.org/syntax/characters/">
          characters
        </a>
        ,{' '}
        <a
          className="link-secondary"
          href="https://www.speechmarkdown.org/syntax/ipa/">
          IPA
        </a>
        , and{' '}
        <a
          className="link-secondary"
          href="https://www.speechmarkdown.org/syntax/number/">
          numbers
        </a>
        .
      </p>
      <div css={styles.controls}>
        <div css={styles.speechMarkdown}>
          <input
            css={styles.speechMarkdownCheck}
            disabled={disabled || submitting}
            type="checkbox"
            id="speech-markdown"
            onChange={(e) => {
              const checked = e.target.checked
              setDisabled(true)
              setSpeechMarkdown(checked)
              setText(swapIPA(text, checked))
            }}
          />
          <label css={styles.speechMarkdownText} htmlFor="speech-markdown">
            Speech Markdown:&nbsp;
            <span css={styles.speechMarkdownStatus}>
              {speechMarkdown ? 'ON' : 'OFF'}
            </span>
          </label>
        </div>
        <div css={styles.buttons}>
          <Button
            secondary
            disabled={disabled || submitting || !!error}
            extraCss={styles.playButton}
            onClick={() => {
              if (disabled || submitting || !audio) {
                return
              }
              if (playing) {
                audio.pause()
              } else {
                audio.currentTime = 0
                audio.play()
              }
            }}>
            {playing ? (
              <SVGIcon
                className="icon"
                icon="#pause"
                extraCss={styles.pauseIcon}
              />
            ) : (
              <SVGIcon
                className="icon"
                icon="#play"
                extraCss={styles.playIcon}
              />
            )}
          </Button>
        </div>
      </div>
      <Textarea
        id="sample-voice-textarea"
        extraCss={styles.textarea}
        label={error}
        labelCss={error ? styles.labelError : undefined}
        loading={submitting}
        value={text}
        onChange={(value) => {
          setDisabled(true)
          setText(value)
        }}
      />
    </div>
  )
}

const styles = {
  ttsSpotlight: css`
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
  textarea: css`
    textarea {
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
    label {
      border: none;
    }
  `,
  labelError: css`
    color: ${theme.textError};
  `,
  controls: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid ${theme.mainBorderDark};
    border-bottom: none;
    border-radius: 7px 7px 0 0;
  `,
  speechMarkdown: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;

    label {
      cursor: pointer;
    }
  `,
  speechMarkdownCheck: css`
    display: none;
  `,
  speechMarkdownText: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
  `,
  speechMarkdownStatus: css`
    color: ${theme.secondary};
  `,
  buttons: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  playButton: css`
    width: 37px;
    height: 37px;
    padding: 0;
    border-radius: 50%;
  `,
  playIcon: css`
    width: 14px;
    height: 14px;
    padding: 1px 0 0 2px;
  `,
  pauseIcon: css`
    width: 24px;
    height: 24px;
    padding: 1px 1px 0 0;
  `
}
