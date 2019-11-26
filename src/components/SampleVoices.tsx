import React, { useState } from 'react'
import Card from './Card'
import Button from './Button'
import SVGIcon from './SVGIcon'
import iconPlay from '../icons/play-circle.svg'
import { css } from '@emotion/core'
import Select from './Select'
import find from 'lodash/find'
import { adjustFontSizeTo } from '../utils/typography'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import Textarea from './Textarea'

const voices = [{ title: 'Spokestack Free', value: 'free' }]

export default function SampleVoices() {
  const [selected, setSelected] = useState<{ value: string; title: string }>(voices[0])
  return (
    <Card title="Sample a Custom Voice">
      <p css={styles.lightText}>
        Enter what you want Spokestack to say below. Use {`{{ }}`} to brakcet your{' '}
        <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">IPA</a>.
      </p>
      <div css={styles.content}>
        <Select
          id="sample-voices"
          selected={selected}
          extraCss={styles.select}
          options={voices}
          onChange={(value) => {
            const voice = find(voices, { value })
            if (voice) {
              setSelected(voice)
            }
          }}
        />
        <Button large extraCss={styles.button}>
          <SVGIcon icon={iconPlay.id} extraCss={styles.playIcon} />
          Hear it
        </Button>
        <Textarea
          id="sample-voice-textarea"
          label="A studio recording of a profession voice actor using 6 hours of audio"
          extraCss={styles.textarea}
          defaultValue={'Hello, welcome to {{spoʊkstæk}}. What do you want to say?'}
        />
      </div>
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
    grid-area: textarea;
  `
}
