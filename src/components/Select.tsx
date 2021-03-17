import * as theme from '../styles/theme'

import React, { SelectHTMLAttributes, useState } from 'react'
import { SerializedStyles, css } from '@emotion/react'

import SVGIcon from './SVGIcon'

export interface Option {
  title: string
  value?: string
}

interface Props
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  id: string
  // Don't need to set options if children is set
  options?: Option[]
  extraCss?: SerializedStyles
  selectCss?: SerializedStyles
  labelCss?: SerializedStyles
  selected: Option
  expanded?: boolean
  onChange: (value: string) => void
}

export default function Select({
  children,
  options,
  extraCss,
  labelCss,
  selectCss,
  id,
  disabled,
  expanded,
  selected = { title: 'None selected' },
  onChange,
  ...props
}: Props) {
  const [open, setOpen] = useState(false)

  const dropdownStyle = [styles.dropdownCommon]
  const labelStyle = [styles.label]
  if (expanded) {
    dropdownStyle.push(styles.dropdownExpanded)
    labelStyle.push(styles.labelExpanded)
  } else {
    dropdownStyle.push(styles.dropdown)
  }

  return (
    <div
      css={[styles.container, extraCss]}
      className={`${open ? 'select-open' : ''}${disabled ? ' disabled' : ''}`}>
      <label
        htmlFor={id}
        className="select-label"
        css={labelStyle.concat(labelCss)}
        onClick={() => {
          setOpen(!disabled && !open)
        }}>
        <p>{selected.title}</p>
        <div css={styles.iconWrap}>
          <SVGIcon className="icon" icon="#arrow-down" extraCss={styles.icon} />
        </div>
      </label>
      <select
        css={[styles.select, selectCss]}
        id={id}
        disabled={disabled}
        value={selected.value}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        {...props}>
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))
          : children}
      </select>
      {options && (
        <div css={dropdownStyle} className="dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              css={
                selected && option.value === selected.value
                  ? [styles.dropdownOption, styles.dropdownOptionSelected]
                  : styles.dropdownOption
              }
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}>
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: css`
    position: relative;
    z-index: 100;

    &.select-open {
      label {
        outline: ${theme.primary} auto 1px;
      }
      .icon {
        transform: rotateZ(180deg);
      }
      .dropdown {
        transform: translateY(0) scaleY(1);
        opacity: 1;
      }
    }
    &.disabled {
      opacity: 0.5;

      label {
        cursor: default;
      }
    }
  `,
  label: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${theme.mainBorder};
    border-radius: 25px;
    cursor: pointer;
    z-index: 99;

    ${theme.ieBreakpoint} {
      display: none;
    }

    ${theme.ieBreakpointMinDefault} {
      display: block;
    }

    p {
      width: 100%;
      overflow: hidden;
      margin: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 20px;
      font-weight: 700;
    }
  `,
  labelExpanded: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  iconWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    flex-shrink: 0;
    background: none;
  `,
  icon: css`
    fill: ${theme.header};
    fill-opacity: 0.75;
    width: 14px;
    height: 14px;
    transition: transform 0.1s ${theme.transitionEasing};
  `,
  select: css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    appearance: none;
    background: transparent;
    border: none;
    color: transparent;
    border-radius: 0;
    z-index: 100;

    optgroup,
    option {
      width: 100%;
      color: ${theme.text};
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  dropdownCommon: css`
    overflow-y: auto;

    ${theme.DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  dropdown: css`
    position: absolute;
    top: 100%;
    width: 100%;
    max-height: 185px;
    background-color: white;
    border: 1px solid ${theme.mainBorder};

    transition: transform 0.2s ${theme.transitionEasing},
      opacity 0.2s ${theme.transitionEasing};
    transform: translateY(-50%) scaleY(0);
    opacity: 0;
  `,
  dropdownExpanded: css`
    border-right: 1px solid ${theme.mainBorder};
  `,
  dropdownOption: css`
    padding: 10px 20px;
    cursor: pointer;
    color: ${theme.primaryColor.fade(0.4).toString()};
    font-weight: 700;
    &:hover {
      background-color: ${theme.primaryColor.fade(0.9).string()};
    }
  `,
  dropdownOptionSelected: css`
    color: ${theme.primary};
    background-color: ${theme.primaryColor.fade(0.9).string()};
    border-top: 1px solid ${theme.mainBorder};
    border-bottom: 1px solid ${theme.mainBorder};
  `
}
