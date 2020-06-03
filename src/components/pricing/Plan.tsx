import * as theme from '../../styles/theme'

import Category, { CategoryProps } from './Category'
import Header, { HeaderProps } from './Header'

import Button from '../Button'
import React from 'react'
import { css } from '@emotion/core'

interface Props extends HeaderProps {
  categories: CategoryProps[]
  extraHeader?: React.ReactNode
  showBanners?: boolean
}

export default function Plan({
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
      <div css={styles.card}>
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
        <a href={slug} className="btn btn-transparent">
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
    .btn {
      width: 100%;
    }
  `,
  card: css`
    width: 100%;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-top: 6px solid ${theme.primaryLight};
    border-radius: 0 0 7px 7px;
    padding: 70px 0 50px;
    margin-bottom: 25px;
  `
}
