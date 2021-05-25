import * as theme from '../../styles/theme'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

interface Props {
  background?: string
  cta: string
  description: string
  features: React.ReactNode[]
  highlight?: boolean
  imageUrl: string
  name: string
  price: React.ReactNode
  slug: string
  subtext?: React.ReactNode
}

export default function Plan({
  background,
  cta,
  description,
  features,
  highlight,
  imageUrl,
  name,
  price,
  slug,
  subtext
}: Props) {
  return (
    <div
      css={styles.plan}
      id={name.toLowerCase()}
      style={{ backgroundColor: background || 'white' }}>
      <h5 css={[styles.header].concat(highlight ? styles.highlight : [])}>
        {name}
      </h5>
      <div css={styles.price}>
        <img alt={name} src={imageUrl} />
        {typeof price === 'string' ? <h2>{price}</h2> : price}
      </div>
      <div css={styles.features}>
        {features.map((feature, i) => (
          <div key={`feature-${i}`} css={styles.feature} className="ie-fix">
            <SVGIcon icon="#checkmark" extraCss={styles.checkmarkIcon} />
            {feature}
          </div>
        ))}
      </div>
      <div css={styles.footer}>
        <h5>{description}</h5>
        <a
          href={slug}
          className={`btn btn-full btn-small${
            highlight ? '' : ' btn-transparent'
          }`}
          tabIndex={0}
          title={cta}>
          {cta}
        </a>
        <div css={styles.subtext}>{subtext}</div>
      </div>
    </div>
  )
}

const styles = {
  plan: css`
    width: 100%;
    border: 1px solid ${theme.pricingBorder};
    border-radius: 7px;
    margin-bottom: 20px;
    overflow: hidden;

    ${theme.ieBreakpointMinDefault} {
      margin-left: 10px;
      margin-right: 10px;
      width: 245px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: flex;
      flex-direction: column;
      display: grid;
      grid-template-rows: auto auto 1fr 250px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      grid-template-rows: auto auto 1fr 227px;
    }
  `,
  header: css`
    background: white;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 1px solid ${theme.pricingBorder};
    padding: 10px;
  `,
  highlight: css`
    background: linear-gradient(to right, ${theme.secondary}, ${theme.primary});
    color: white;
  `,
  price: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 180px;
    background: linear-gradient(${theme.pricingBorder}, transparent);

    h2 {
      font-size: 42px;
    }
  `,
  features: css`
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    padding: 0 0 20px;
  `,
  feature: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    padding: 10px 10px 10px 12px;

    a {
      font-weight: 400;
    }
  `,
  checkmarkIcon: css`
    width: 24px;
    height: 24px;
    fill: ${theme.primary};
    flex-shrink: 0;
    margin-right: 5px;
  `,
  footer: css`
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    padding: 15px;
    border-top: 1px solid ${theme.pricingBorder};

    h5 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 5px 0 25px;
      width: 100%;
      height: 80px;
    }
  `,
  subtext: css`
    font-size: 14px;
    font-style: italic;
    margin-top: 10px;
    width: 100%;

    a {
      font-weight: 400;
    }
  `
}
