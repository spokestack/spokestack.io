import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/react'

import React from 'react'

export interface BlueCardProps {
  children: React.ReactNode
  extraCss?: SerializedStyles | SerializedStyles[]
  id?: string
  small?: boolean
  text: string
  title: string
}

export default function BlueCard({
  children,
  extraCss,
  id,
  small,
  text,
  title
}: BlueCardProps) {
  const style = [styles.card]
  if (small) {
    style.push(styles.smallCard)
  }
  return (
    <section id={id} className="blue-card" css={style.concat(extraCss!)}>
      <Global
        styles={css`
          html.dark-mode {
            .blue-card {
              background-color: ${theme.navFullColumnDark};
            }
          }
        `}
      />
      <h3>{title}</h3>
      <div className="title">{text}</div>
      {children}
    </section>
  )
}

const styles = {
  card: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${theme.primaryLighter};
    padding: 75px 40px;

    h3 {
      margin-bottom: 15px;
    }

    .title {
      max-width: 815px;
      margin: 0 auto 30px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      min-height: 400px;
    }
  `,
  smallCard: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      width: 100%;
      max-width: 808px;
      margin: 0 auto;
      min-height: 0;
      border-radius: 7px;
    }

    .title {
      max-width: 630px;
    }
  `
}
