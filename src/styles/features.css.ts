import { css } from '@emotion/react'
import * as theme from './theme'

export const content = css`
  padding: 0 20px;
`
export const callouts = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0 20px;

  ${theme.MIN_DEFAULT_MEDIA_QUERY} {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
  }
`
export const utteranceColumn = css`
  margin-bottom: 25px;
`
export const image = css`
  display: block;
  width: 100%;
`
export const detection = css`
  margin: 25px 0;

  ${theme.MIN_DEFAULT_MEDIA_QUERY} {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;

    li {
      width: 33%;
    }
  }
`
export const step = css`
  padding-top: 75px;

  &:nth-of-type(n + 2) {
    background: ${theme.pricingBorderHorizontal} no-repeat top center;
    margin-top: 50px;
  }
`
export const number = css`
  color: ${theme.textColor.fade(0.25).toString()};
`
export const stepImage = css`
  margin-bottom: 25px;
`
export const utterances = css`
  align-items: center;
  p {
    margin: 0;
    max-width: 255px;
  }
  .column-third {
    margin-bottom: 25px;
  }

  ${theme.MIN_DEFAULT_MEDIA_QUERY} {
    align-items: flex-start;
  }
`
