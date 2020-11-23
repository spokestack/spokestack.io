import * as theme from '../../styles/theme'

import Category, { CategoryProps } from './Category'
import Header, { HeaderProps } from './Header'

import Button from '../Button'
import React from 'react'
import { css } from '@emotion/core'

interface Props extends HeaderProps {
  background?: string
  categories: CategoryProps[]
  extraHeader?: React.ReactNode
  showBanners?: boolean
}

export default function Plan({
  background,
  cta,
  extraHeader,
  name,
  price,
  slug,
  categories,
  showBanners
}: Props) {
  return (
    <div css={styles.plan}>
      <div
        css={styles.card}
        className="ie-fix"
        style={{ backgroundColor: background || 'white' }}>
        {extraHeader}
        <Header cta={cta} name={name} price={price} slug={slug} />
        {categories.map((category) => (
          <Category
            key={category.name}
            showBanners={showBanners}
            {...category}
          />
        ))}
      </div>
      {cta === 'Coming soon' ? (
        <Button disabled transparent>
          {cta}
        </Button>
      ) : (
        <a href={slug} className="btn btn-transparent" tabIndex={0} title={cta}>
          {cta}
        </a>
      )}
    </div>
  )
}

const styles = {
  plan: css`
    position: relative;
    margin-top: 75px;
    height: 100%;
    .btn {
      width: 100%;
    }

    ${theme.ieBreakpointMinDefault} {
      margin-left: 12px;
      margin-right: 12px;
      width: 186px;
    }
  `,
  card: css`
    width: 100%;
    border: 1px solid ${theme.mainBorder};
    border-top: 6px solid ${theme.primaryColor.fade(0.75).toString()};
    border-radius: 0 0 7px 7px;
    padding: 70px 0 50px;
    margin-bottom: 25px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      height: calc(100% - 44px - 25px - 75px);
    }
  `
}
