import * as theme from '../styles/theme'

import React, { PureComponent } from 'react'
import { getWakeword, uploadWakeword } from '../utils/wakeword'

import Button from './Button'
import Card from './Card'
import { CopyInputWithButton } from './EditButtons'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import WakewordCheckmark from './WakewordCheckmark'
import { capitalize } from 'lodash'
import { css } from '@emotion/core'
import { record } from 'spokestack/client'

// The uploader will not allow anything longer than 3 seconds.
// We can't use 3 seconds here though or it results in recordings with
// 3 seconds and some milliseconds.
const MAX_RECORD_TIME = 2.9

interface Props {
  numRecordings?: number
  assistant: string
}

interface State {
  error: string
  listening: boolean
  loading: boolean
  uploading: boolean
  remaining: number
  recorded: number
  token: string
  wakeword: string
}

export default class Wakeword extends PureComponent<Props, State> {
  wakeword: string

  static defaultProps = {
    numRecordings: 3
  }

  state: State = {
    error: '',
    listening: false,
    loading: false,
    uploading: false,
    remaining: MAX_RECORD_TIME,
    recorded: 0,
    token: '',
    wakeword: ''
  }

  async componentDidMount() {
    const { assistant } = this.props
    this.setState({ loading: true })
    const [error, wakeword] = await getWakeword(assistant)
    if (error) {
      this.setState({ error: error.message, loading: false })
      return
    }
    this.setState({ wakeword, loading: false })
  }

  getMessage() {
    const { numRecordings } = this.props
    const {
      error,
      listening,
      loading,
      uploading,
      remaining,
      recorded,
      wakeword
    } = this.state
    if (error) {
      return error
    }
    if (listening) {
      return `Listening..${remaining}`
    }
    if (uploading) {
      return 'Uploading audio data...'
    }
    if (loading) {
      return 'Loading...'
    }
    if (recorded === 0) {
      return `Say \u201C${capitalize(wakeword)}\u201D`
    }
    if (recorded < numRecordings - 1) {
      return `Say \u201C${capitalize(wakeword)}\u201D again`
    }
    if (recorded === numRecordings - 1) {
      return `Say \u201C${capitalize(wakeword)}\u201D one more time`
    }
    return 'Thanks for your help!'
  }

  upload = async (buffer: AudioBuffer) => {
    const { assistant } = this.props
    const { recorded, wakeword } = this.state
    this.setState({ listening: false, uploading: true })
    const [uploadError, response] = await uploadWakeword({
      buffer,
      assistant,
      wakeword
    })
    if (uploadError) {
      this.setState({ error: uploadError.message, uploading: false })
      return
    }
    if (!response || !response.id) {
      console.log(response)
      this.setState({
        error:
          'No token was returned in the response. See the logs for more info.',
        uploading: false
      })
      return
    }
    this.setState({
      recorded: recorded + 1,
      token: response.id,
      uploading: false
    })
  }

  record = async () => {
    // Already recorded enough
    const { numRecordings } = this.props
    const { recorded } = this.state
    if (recorded >= numRecordings) {
      return
    }
    record({
      time: MAX_RECORD_TIME,
      onProgress: (remaining) => {
        this.setState({ remaining })
      },
      onStart: () => {
        this.setState({ listening: true })
      }
    })
      .then(this.upload)
      .catch((error) => {
        this.setState({
          error: typeof error === 'string' ? error : error.message,
          listening: false
        })
      })
  }

  render() {
    const { numRecordings } = this.props
    const { error, listening, loading, uploading, recorded, token } = this.state

    return (
      <div css={styles.container}>
        <Card title="Wakeword training" extraCss={styles.card}>
          <div css={styles.content}>
            <h4 css={styles.header}>{this.getMessage()}</h4>
            {recorded >= numRecordings && token ? (
              <div css={styles.token}>
                <p>The following token is proof of your recordings.</p>
                <CopyInputWithButton
                  id="wakeword-token"
                  title="Response token"
                  value={token}
                />
              </div>
            ) : (
              <Button
                disabled={loading || !!error || recorded >= numRecordings}
                submitting={uploading || listening}
                onClick={this.record}>
                <SVGIcon icon="#mic" extraCss={styles.mic} />
                Push to record
              </Button>
            )}
            <div css={styles.steps}>
              {[...Array(numRecordings)].map((_, i) => (
                <WakewordCheckmark
                  key={`wakeword-checkmark-${i}`}
                  css={[styles.check, recorded >= i + 1 && styles.checkFilled]}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 20px;
  `,
  card: css`
    width: 100%;
    align-items: stretch;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      max-width: 600px;
    }
  `,
  content: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
  `,
  header: css`
    margin: 0 0 20px;
  `,
  token: css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  goAgainButton: css`
    margin-top: 20px;
  `,
  mic: css`
    width: 14px;
    height: 14px;
    margin-right: 10px;
  `,
  steps: css`
    position: relative;
    width: 275px;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      margin-top: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background-color: ${theme.primary};
      z-index: 0;
    }
  `,
  check: css`
    width: 75px;
    height: 76px;
    fill: white;
    z-index: 1;
  `,
  checkFilled: css`
    fill: ${theme.primary};

    polygon {
      fill: white !important;
    }
  `
}
