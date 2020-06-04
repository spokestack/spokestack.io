import * as theme from '../../styles/theme'

import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import React from 'react'
import { adjustFontSizeTo } from '../../styles/typography'
import { css } from '@emotion/core'

interface Feature {
  enabled: boolean
  name: string
  desktopText?: React.ReactNode
  mobileText?: React.ReactNode
  showDisabled?: boolean
}

export interface CategoryProps {
  name: string
  features: Feature[]
  showBanners?: boolean
}

export default function Category({
  name,
  features,
  showBanners
}: CategoryProps) {
  return (
    <div css={styles.category} className={showBanners ? 'show-banners' : ''}>
      <h4 className="category-header" css={styles.mobile}>
        {name}
      </h4>
      <div css={styles.features}>
        {features.map((feature, i) => {
          const classes = ['category-feature']
          if (feature.enabled) {
            classes.push('feature-enabled')
          }
          if (feature.showDisabled) {
            classes.push('show-disabled')
          }
          return (
            <div
              key={`feature-${i}`}
              className={classes.join(' ')}
              css={[styles.feature]}
              data-banner={feature.name}>
              <span css={styles.desktop}>
                {(feature.enabled || feature.showDisabled) &&
                  (feature.desktopText || <strong>✓</strong>)}
              </span>
              <span css={styles.mobile}>
                {feature.mobileText || feature.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const desktopHeaderStyle = css`
  position: absolute;
  top: 0;
  left: -310px;
  right: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  text-align: left;
  padding: 0 20px;
  font-weight: 700;
`

const styles = {
  category: css`
    position: relative;
    margin-top: 40px;

    h4 {
      color: ${theme.pricingHeader};
      font-size: ${adjustFontSizeTo('14px').fontSize};
      margin-bottom: 10px;
      padding: 0 20px;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      &.show-banners {
        .category-header {
          ${desktopHeaderStyle}
        }
        .category-feature {
          &:before {
            content: attr(data-banner);
            ${desktopHeaderStyle};
            height: 100%;
          }
          &:nth-of-type(odd):before {
            background-color: ${theme.pricingRowBackground};
          }
        }
      }
    }
  `,
  features: css`
    .feature-enabled,
    .show-disabled {
      padding-left: 40px;
    }
    .feature-enabled {
      &:before {
        content: '✓';
        position: absolute;
        left: 20px;
        font-weight: 700;
      }
    }
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-top: 30px;

      .feature-enabled,
      .show-disabled {
        padding-left: 20px;
        &:before {
          display: none;
        }
      }
    }
  `,
  feature: css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 53px;
    padding: 0 20px;
    font-size: ${adjustFontSizeTo('14px').fontSize};

    &:nth-of-type(odd) {
      background-color: ${theme.pricingRowBackground};
    }

    &:not(.feature-enabled):not(.show-disabled) {
      display: none;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: flex !important;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      justify-content: center;
      text-align: center;

      &:nth-of-type(odd):after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: -25px;
        right: 100%;
        background-color: ${theme.pricingRowBackground};
      }
    }
  `,
  desktop: css`
    display: none;
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: block;
    }
  `,
  mobile: css`
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: none;
    }
  `
}
