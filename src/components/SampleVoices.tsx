import React, { PureComponent } from 'react'
import Select, { Option } from './Select'

import Button from './Button'
import Card from './Card'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import Textarea from './Textarea'
import { adjustFontSizeTo } from '../utils/typography'
import { css } from '@emotion/core'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import iconPlay from '../icons/play-circle.svg'
import * as theme from '../utils/theme'
import synthesize from '../utils/synthesize'
import voices from '../utils/voices'

const options = voices.map((voice) => ({
  value: voice.model,
  title: voice.label
}))

interface State {
  disabled: boolean
  errorText: string
  selected: Option
  submitting: boolean
  text: string
}

export default class SampleVoices extends PureComponent {
  private audio: HTMLAudioElement
  state: State = {
    disabled: false,
    errorText: null,
    selected: options[0],
    submitting: false,
    text: 'Hello, welcome to {{spoʊkstæk}}. What would you like to say?'
  }

  componentDidMount() {
    this.getAudio()
  }

  loadAudio(url: string) {
    this.audio = new Audio(url)
    this.audio.addEventListener('canplaythrough', () => {
      this.setState({ disabled: false, submitting: false })
    })
    this.audio.load()
  }

  getAudio = async () => {
    const { selected, text } = this.state
    if (!text) {
      return
    }
    this.setState({
      submitting: true,
      errorText: null
    })
    const [synthError, response] = await synthesize(selected.value, text)
    if (!synthError && response && response.url) {
      this.loadAudio(response.url)
    } else {
      this.setState({
        disabled: false,
        submitting: false,
        errorText:
          synthError.message || 'There was a problem synthesizing the text. Please try again.'
      })
    }
  }

  getAudioDebounced = debounce(this.getAudio, 1000)

  play = () => {
    const { disabled, submitting } = this.state
    if (this.audio && !disabled && !submitting) {
      this.audio.currentTime = 0
      this.audio.play()
    }
  }

  render() {
    const { disabled, errorText, selected, submitting, text } = this.state
    const selectedVoice = find(voices, { model: selected.value })

    return (
      <Card title="Sample a Custom Voice">
        <p css={styles.lightText}>
          Enter what you want Spokestack to say below. Use {`{{ }}`} to bracket your{' '}
          <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">IPA</a>.
        </p>
        <div css={styles.content}>
          <Select
            id="sample-voices"
            disabled={disabled || submitting}
            selected={selected}
            extraCss={styles.select}
            options={options}
            onChange={(value) => {
              const option = find(options, { value })
              if (option) {
                this.setState({ selected: option }, this.getAudio)
              }
            }}
          />
          <Button
            large
            disabled={disabled || submitting}
            extraCss={styles.button}
            onClick={this.play}>
            <SVGIcon icon={iconPlay.id} extraCss={styles.playIcon} />
            {submitting ? 'Synthesizing...' : 'Hear it'}
          </Button>
          <Textarea
            id="sample-voice-textarea"
            extraCss={styles.textarea}
            label={errorText || selectedVoice.description}
            labelCss={errorText ? styles.labelError : null}
            loading={submitting}
            value={text}
            onChange={(value) => {
              this.setState({ disabled: true, text: value }, this.getAudioDebounced)
            }}
          />
        </div>
      </Card>
    )
  }
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
    color: ${theme.textLight};
    text-align: center;
    margin-bottom: 20px;
  `,
  select: css`
    grid-area: select;

    ${theme.ieBreakpoint} {
      margin-bottom: 20px;
    }
  `,
  button: css`
    width: 100%;
    grid-area: button;

    ${theme.ieBreakpoint} {
      margin-bottom: 20px;
    }
  `,
  playIcon: css`
    fill: ${theme.text};
    width: 16px;
    height: 16px;
    margin-right: 5px;
    margin-left: 0 !important;
  `,
  textarea: css`
    grid-area: textarea;
  `,
  labelError: css`
    color: ${theme.textError};
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
    background-color: ${theme.secondaryColor.fade(0.2).toString()};
    /* color: white; */
    z-index: 101;

    p {
      margin: 0 0 0 10px;
    }
  `
}
