import * as theme from '../styles/theme'

import React, { Component } from 'react'

import Button from './Button'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/react'

interface Props {
  disabled?: boolean
  onFileAdded: (file: File) => void
}

interface State {
  highlight: boolean
}

export default class Dropzone extends Component<Props, State> {
  private fileInputRef = React.createRef<HTMLInputElement>()

  state = {
    highlight: false
  }

  openFileDialog = () => {
    if (this.props.disabled) return
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click()
    }
  }

  fileAdded(file: File) {
    const { onFileAdded } = this.props
    if (file && onFileAdded) {
      onFileAdded(file)
    }
  }

  onFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.disabled) return
    this.fileAdded(event.target.files[0])
  }

  onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (this.props.disabled) return
    event.preventDefault()
    this.setState({ highlight: true })
  }

  onDragLeave = () => {
    this.setState({ highlight: false })
  }

  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (this.props.disabled) return
    event.preventDefault()
    this.fileAdded(event.dataTransfer.files[0])
    this.setState({ highlight: false })
  }

  render() {
    const { disabled } = this.props
    const { highlight } = this.state
    return (
      <div
        css={styles.dropzone}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{
          cursor: disabled ? 'default' : 'pointer',
          backgroundColor: highlight ? theme.codeBackground : 'white'
        }}>
        <input
          ref={this.fileInputRef}
          style={{ display: 'none' }}
          type="file"
          onChange={this.onFilesAdded}
        />
        <Button disabled={disabled} large>
          <SVGIcon icon="#nlu" extraCss={styles.icon} />
          Import
        </Button>
      </div>
    )
  }
}

const styles = {
  dropzone: css`
    width: 100%;
    height: 200px;
    border: 2px dashed ${theme.mainBorder};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  icon: css`
    fill: ${theme.textDarkBg};
    width: 12px;
    height: 14px;
    margin-right: 10px;
  `
}
