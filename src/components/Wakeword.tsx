import * as theme from '../styles/theme'

import React, { PureComponent } from 'react'

import Button from './Button'
import Card from './Card'
import { CopyButton } from './EditButtons'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'
import randomChoice from '../utils/randomChoice'
import { record } from 'spokestack/client'
import uploadWakeword from '../utils/uploadWakeword'

const MAX_RECORD_TIME = 2.9

function Checkmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="75"
      height="76"
      viewBox="0 0 75 76"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M37.5,74.5 C57.9345357,74.5 74.5,57.9345357 74.5,37.5 C74.5,17.0654643 57.9345357,0.5 37.5,0.5 C17.0654643,0.5 0.5,17.0654643 0.5,37.5 C0.5,57.9345357 17.0654643,74.5 37.5,74.5 Z"
        stroke="#2F5BEA"
        fillRule="nonzero"
      />
      <polygon
        fill="#2F5BEA"
        points="31.7897727 44.4247159 50.5823864 25.5894886 53.0965909 28.1036932 31.7897727 49.4105114 21.9034091 39.5241477 24.375 37.0099432"
      />
    </svg>
  )
}

interface Props {
  numRecordings?: number
  assistant: string
  wakewords: string[]
}

interface State {
  error: string
  listening: boolean
  uploading: boolean
  remaining: number
  recorded: number
  token: string
}

export default class Wakeword extends PureComponent<Props, State> {
  private tokenRef = React.createRef<HTMLInputElement>()
  wakeword: string

  static defaultProps = {
    numRecordings: 3
  }

  state: State = {
    error: '',
    listening: false,
    uploading: false,
    remaining: this.props.numRecordings,
    recorded: 0,
    token: ''
  }

  constructor(props: Props) {
    super(props)
    this.wakeword = randomChoice(props.wakewords)
  }

  getMessage() {
    const { numRecordings } = this.props
    const { error, listening, uploading, remaining, recorded } = this.state
    if (error) {
      return error
    }
    if (listening) {
      return `Listening..${remaining}`
    }
    if (uploading) {
      return 'Uploading audio data...'
    }
    if (recorded === 0) {
      return `Say \u201C${this.wakeword}\u201D`
    }
    if (recorded < numRecordings - 1) {
      return `Say \u201C${this.wakeword}\u201D again`
    }
    if (recorded === numRecordings - 1) {
      return `Say \u201C${this.wakeword}\u201D one more time`
    }
    return 'Thanks for your help!'
  }

  upload = async (buffer: AudioBuffer) => {
    const { assistant } = this.props
    const { recorded } = this.state
    this.setState({ listening: false, uploading: true })
    const [uploadError, response] = await uploadWakeword({
      buffer,
      assistant,
      wakeword: this.wakeword
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
    this.setState({ listening: true })
    record({
      time: MAX_RECORD_TIME,
      onProgress: (remaining) => {
        this.setState({ remaining })
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
    const { listening, uploading, recorded, token } = this.state

    return (
      <div css={styles.container}>
        <Card title="Wakeword training" extraCss={styles.card}>
          <div css={styles.content}>
            <h4 css={styles.header}>{this.getMessage()}</h4>
            {recorded >= numRecordings && token ? (
              <div css={styles.token}>
                <p>The following token is proof of your recordings.</p>
                <div css={styles.row}>
                  <label className="label" htmlFor="wakeword-token">
                    Response token
                  </label>
                  <CopyButton title="Copy Token" inputRef={this.tokenRef} />
                </div>
                <input
                  ref={this.tokenRef}
                  readOnly
                  id="wakeword-token"
                  type="text"
                  className="input"
                  value={token}
                />
                <Button
                  transparent
                  extraCss={styles.goAgainButton}
                  onClick={() => window.location.reload()}>
                  Let&rsquo;s go again!
                </Button>
              </div>
            ) : (
              <Button
                disabled={uploading || recorded >= numRecordings}
                submitting={uploading || listening}
                onClick={this.record}>
                <SVGIcon icon="#mic" extraCss={styles.mic} />
                Push to record
              </Button>
            )}
            <div css={styles.steps}>
              {[...Array(numRecordings)].map((_, i) => (
                <Checkmark
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
  row: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
