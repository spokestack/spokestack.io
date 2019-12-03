import React, { useEffect, useRef, useState } from 'react'
import Select, { Option } from './Select'

import Button from './Button'
import Card from './Card'
import LoadingIcon from './LoadingIcon'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import Textarea from './Textarea'
import { adjustFontSizeTo } from '../utils/typography'
import { css } from '@emotion/core'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import iconPlay from '../icons/play-circle.svg'
import { secondaryColor } from '../utils/globalStyles'
import synthesize from '../utils/synthesize'
import voices from '../utils/voices'

const options = voices.map((voice) => ({ value: voice.model, title: voice.label }))

export default function SampleVoices() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [errorText, setErrorText] = useState<string>(null)
  const [audioSrc, setAudioSrc] = useState<string>(null)
  const [selected, setSelected] = useState<Option>(options[0])
  const selectedVoice = find(voices, { model: selected.value })
  function play() {
    if (!submitting && audioRef.current) {
      audioRef.current.play()
    }
  }
  async function getAudio() {
    const text = textareaRef.current.value
    setSubmitting(true)
    setErrorText(null)
    setAudioSrc(null)
    const [synthError, response] = await synthesize(selected.value, text)
    if (!synthError && response && response.url) {
      setAudioSrc(response.url)
    } else {
      setSubmitting(false)
      setErrorText(
        synthError.message || 'There was a problem synthesizing the text. Please try again.'
      )
    }
  }
  useEffect(() => {
    getAudio()
  }, [selected])
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.addEventListener('canplaythrough', () => {
        setSubmitting(false)
      })
      audioRef.current.load()
    }
  }, [audioSrc])
  return (
    <Card title="Sample a Custom Voice">
      {audioSrc && <audio ref={audioRef} preload="auto" src={audioSrc} />}
      <p css={styles.lightText}>
        Enter what you want Spokestack to say below. Use {`{{ }}`} to bracket your{' '}
        <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">IPA</a>.
      </p>
      <div css={styles.content}>
        <Select
          id="sample-voices"
          disabled={submitting}
          selected={selected}
          extraCss={styles.select}
          options={options}
          onChange={(option) => {
            if (option) {
              setSelected(option)
            }
          }}
        />
        <Button large disabled={submitting} extraCss={styles.button} onClick={play}>
          <SVGIcon icon={iconPlay.id} extraCss={styles.playIcon} />
          Hear it
        </Button>
        <div css={styles.textarea}>
          <Textarea
            ref={textareaRef}
            id="sample-voice-textarea"
            disabled={submitting}
            label={errorText || selectedVoice.description}
            labelCss={errorText ? styles.labelError : null}
            defaultValue={'Hello, welcome to {{spoʊkstæk}}. What would you like to say?'}
            onChange={debounce(getAudio, 1000)}
          />
        </div>
      </div>
      {submitting && (
        <div css={styles.loading}>
          <LoadingIcon />
          <p>Synthesizing...</p>
        </div>
      )}
    </Card>
  )
}

const styles = {
  content: css`
    display: grid;
    grid-template-columns: 100%;
    grid-template-areas:
      'select'
      'button'
      'textarea';
    grid-gap: 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      grid-template-columns: 1fr 200px;
      grid-template-areas:
        'select button'
        'textarea textarea';
    }
  `,
  lightText: css`
    ${adjustFontSizeTo('16px')};
    text-align: center;
    color: var(--text-color-light);
    margin-bottom: 20px;
  `,
  select: css`
    grid-area: select;
  `,
  button: css`
    width: 100%;
    grid-area: button;
  `,
  playIcon: css`
    fill: var(--text-color);
    width: 16px;
    height: 16px;
    margin-right: 5px;
    margin-left: 0 !important;
  `,
  textarea: css`
    position: relative;
    grid-area: textarea;
  `,
  labelError: css`
    color: var(--text-color-error);
  `,
  loading: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${secondaryColor.fade(0.2).toString()};
    /* color: white; */
    z-index: 101;

    p {
      margin: 0 0 0 10px;
    }
  `
}
