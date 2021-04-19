import * as theme from '../../styles/theme'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

export interface HeaderProps {
  cta: string
  name: React.ReactNode
  price: string
  subtitle?: string
  slug?: string
}

export default function Header({
  cta,
  name,
  price,
  subtitle,
  slug
}: HeaderProps) {
  return (
    <header css={styles.pricingHeader}>
      <h4 className="blue">{name}</h4>
      <h3>{price}</h3>
      {cta === 'Coming soon' ? (
        <p>{cta}</p>
      ) : (
        <a href={slug}>
          {cta}
          <SVGIcon
            className="icon"
            icon="#arrow-forward"
            extraCss={styles.iconArrow}
          />
        </a>
      )}
      {!!subtitle && <p css={styles.subtitle}>{subtitle}</p>}
    </header>
  )
}

const styles = {
  pricingHeader: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    height: 170px;

    h4 {
      position: relative;
    }

    h4,
    h2 {
      margin-bottom: 10px;
    }

    p {
      margin: 0;
    }

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      font-weight: 400;
      margin-bottom: 10px;

      &:hover .icon {
        fill: ${theme.linkHover};
      }
    }
  `,
  subtitle: css`
    font-size: 14px;
  `,
  iconArrow: css`
    width: 18px;
    height: 18px;
    fill: ${theme.primary};
  `
}
