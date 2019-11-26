import React, { SelectHTMLAttributes, useState } from 'react'
import { SerializedStyles, css } from '@emotion/core'
import SVGIcon from './SVGIcon'
import iconArrowDown from '../icons/arrow-down.svg'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { primaryColor } from '../utils/globalStyles'

export interface Option {
  value: string
  title: string
}

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  id: string
  // Don't need to set options if children is set
  options?: Option[]
  extraCss?: SerializedStyles
  selectCss?: SerializedStyles
  labelCss?: SerializedStyles
  iconCss?: SerializedStyles
  iconWrapCss?: SerializedStyles
  selected: Option
  onChange: (value: string) => void
}

export default function Select({
  children,
  options,
  extraCss,
  labelCss,
  iconCss,
  iconWrapCss,
  selectCss,
  id,
  selected,
  onChange,
  ...props
}: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div css={[styles.container, extraCss]}>
      <label
        htmlFor={id}
        css={css`
          ${styles.label}
          ${open ? styles.labelOpen : null}
          ${labelCss}
        `}
        onClick={() => {
          setOpen(!open)
        }}>
        <p>{selected.title}</p>
        <div css={[styles.iconWrap, iconWrapCss]}>
          <SVGIcon
            icon={iconArrowDown.id}
            extraCss={css`
              ${styles.icon}
              ${open ? styles.iconOpen : null}
              ${iconCss}
            `}
          />
        </div>
      </label>
      <select
        css={[styles.select, selectCss]}
        id={id}
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
        <div
          css={css`
            ${styles.dropdown}
            ${open ? styles.dropdownOpen : null}
          `}>
          {options.map((option) => (
            <div
              key={option.value}
              css={styles.dropdownOption}
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
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
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
    background-color: white;
    border: 1px solid var(--main-border-color);
    border-radius: 25px;
    cursor: pointer;
    z-index: 99;

    p {
      width: 100%;
      overflow: hidden;
      color: var(--header-color);
      margin: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 20px;
    }
  `,
  labelOpen: css`
    outline: var(--primary-color) auto 1px;
  `,
  iconWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    flex-shrink: 0;
    border-left: 1px solid var(--main-border-color);
    background-color: var(--text-color-dark-bg);
    border-radius: 0 25px 25px 0;
  `,
  icon: css`
    fill: var(--primary-color);
    width: 25px;
    height: 25px;
  `,
  iconOpen: css`
    transform: rotateZ(180deg);
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
    border-radius: 25px;
    z-index: 100;

    optgroup,
    option {
      width: 100%;
      color: var(--text-color);
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  dropdown: css`
    position: relative;
    top: calc(100% - 2px);
    width: 100%;
    background-color: white;
    border: 1px solid var(--main-border-color);
    transition: transform 0.2s var(--transition-easing), opacity 0.2s var(--transition-easing);
    transform: translateY(-100%);
    opacity: 0;
  `,
  dropdownOpen: css`
    transform: translateY(0);
    opacity: 1;
  `,
  dropdownOption: css`
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: ${primaryColor.fade(0.9).string()};
    }
  `
}
