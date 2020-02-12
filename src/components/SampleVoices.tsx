import React, { PureComponent } from 'react'
import Select, { Option } from './Select'

import Button from './Button'
import Card from './Card'
import { MIN_TABLET_MEDIA_QUERY } from 'typography-breakpoint-constants'
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

const defaultStrings = {
  ipa: 'Hello, welcome to {{spoʊkstæk}}. What would you like to say?',
  md:
    'Hello, welcome to (spokestack)[ipa:"spoʊkstæk"]. What would you like to say?'
}

const options = voices.map((voice) => ({
  value: voice.model,
  title: voice.label
}))

interface State {
  disabled: boolean
  errorText: string
  selected: Option
  speechMarkdown: boolean
  submitting: boolean
  text: string
}

export default class SampleVoices extends PureComponent {
  private audio: HTMLAudioElement
  state: State = {
    disabled: false,
    errorText: null,
    selected: options[0],
    speechMarkdown: false,
    submitting: false,
    text: defaultStrings.ipa
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
    const { selected, speechMarkdown, text } = this.state
    if (!text) {
      return
    }
    this.setState({
      submitting: true,
      errorText: null
    })
    const [synthError, response] = await synthesize(text, {
      voice: selected.value,
      isMarkdown: speechMarkdown
    })
    if (!synthError && response && response.url) {
      this.loadAudio(response.url)
    } else {
      this.setState({
        disabled: false,
        submitting: false,
        errorText:
          synthError.message ||
          'There was a problem synthesizing the text. Please try again.'
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
    const {
      disabled,
      errorText,
      selected,
      speechMarkdown,
      submitting,
      text
    } = this.state
    const selectedVoice = find(voices, { model: selected.value })

    return (
      <Card title="Sample a Custom Voice">
        <p css={styles.lightText}>
          Enter your text below. We support{' '}
          <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">
            IPA
          </a>{' '}
          input enclosed in {`{{ double braces }}`}, or a subset of{' '}
          <a href="https://www.speechmarkdown.org/">Speech Markdown</a>{' '}
          including{' '}
          <a href="https://www.speechmarkdown.org/syntax/break/">breaks</a>,{' '}
          <a href="https://www.speechmarkdown.org/syntax/characters/">
            characters
          </a>
          , <a href="https://www.speechmarkdown.org/syntax/ipa/">IPA</a>, and{' '}
          <a href="https://www.speechmarkdown.org/syntax/number/">numbers</a>.
        </p>
        <div css={styles.content}>
          <div css={styles.controls}>
            <Select
              id="sample-voices"
              disabled={disabled || submitting}
              selected={selected}
              extraCss={styles.select}
              iconWrapCss={styles.selectIconWrap}
              options={options}
              onChange={(value) => {
                const option = find(options, { value })
                if (option) {
                  this.setState({ selected: option }, this.getAudio)
                }
              }}
            />
            <div css={styles.speechMarkdown}>
              <input
                css={styles.speechMarkdownCheck}
                type="checkbox"
                id="speech-markdown"
                onChange={(e) => {
                  const checked = e.target.checked
                  if (checked && text === defaultStrings.ipa) {
                    this.setState({ text: defaultStrings.md })
                  } else if (!checked && text === defaultStrings.md) {
                    this.setState({ text: defaultStrings.ipa })
                  }
                  this.setState({ speechMarkdown: checked })
                }}
              />
              <label
                css={styles.speechMarkdownLabel}
                htmlFor="speech-markdown"
              />
              <label css={styles.speechMarkdownText} htmlFor="speech-markdown">
                Speech Markdown:&nbsp;
                <strong css={styles.speechMarkdownStatus}>
                  {speechMarkdown ? 'ON' : 'OFF'}
                </strong>
              </label>
            </div>
          </div>
          <Textarea
            id="sample-voice-textarea"
            extraCss={styles.textarea}
            label={errorText || selectedVoice.description}
            labelCss={errorText ? styles.labelError : null}
            loading={submitting}
            value={text}
            onChange={(value) => {
              this.setState(
                { disabled: true, text: value },
                this.getAudioDebounced
              )
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
        </div>
      </Card>
    )
  }
}

const styles = {
  lightText: css`
    ${adjustFontSizeTo('16px')};
    color: ${theme.textLight};
    text-align: center;
    margin-bottom: 20px;
  `,
  content: css`
    display: flex;
    flex-direction: column;
  `,
  controls: css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.textDarkBg};
    border-radius: 7px 7px 0 0;
    border: 1px solid ${theme.mainBorder};
    border-bottom: none;

    ${MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
      align-items: center;
    }
  `,
  select: css`
    width: 100%;
    height: 40px;

    label {
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
    .icon {
      fill: ${theme.text};
    }
    p {
      font-size: ${adjustFontSizeTo('16px').fontSize};
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      width: 250px;
      border-right: 1px solid ${theme.mainBorder};

      label {
        border-bottom: none;
      }
    }
  `,
  selectIconWrap: css`
    background: none;
    border-radius: 0;
    border: 0;
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

    &:checked + label {
      background-color: ${theme.primaryColor.fade(0.8).toString()};
    }
  `,
  speechMarkdownLabel: css`
    display: block;
    width: 30px;
    height: 30px;
    background: url(/speech-markdown.png) no-repeat 5px 6px;
    background-size: 20px 20px;
    padding: 5px;
    margin-left: 15px;
    border-radius: 2px;
  `,
  speechMarkdownText: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${adjustFontSizeTo('16px').fontSize};
    margin-left: 10px;
    user-select: none;
  `,
  speechMarkdownStatus: css`
    color: ${theme.primary};
  `,
  button: css`
    align-self: flex-end;
  `,
  playIcon: css`
    fill: ${theme.text};
    width: 16px;
    height: 16px;
    margin-right: 5px;
    margin-left: 0 !important;
  `,
  textarea: css`
    margin-bottom: 20px;
    textarea {
      border-radius: 0;
    }
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
