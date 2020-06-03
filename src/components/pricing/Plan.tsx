import * as theme from '../../styles/theme'

import Category, { CategoryProps } from './Category'
import Header, { HeaderProps } from './Header'

import Button from '../Button'
import React from 'react'
import { css } from '@emotion/core'

interface Props extends HeaderProps {
  categories: CategoryProps[]
  showBanners?: boolean
}

export default function Plan({
  cta,
  name,
  price,
  slug,
  categories,
  showBanners
}: Props) {
  return (
    <div>
      <div css={styles.card}>
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
  card: css`
    width: 100%;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-top: 6px solid ${theme.primaryLight};
    border-radius: 0 0 7px 7px;
    padding: 50px 0;
    margin-bottom: 25px;
  `
}
