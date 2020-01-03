import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { css } from '@emotion/core'
import AccountCard from './AccountCard'
import { adjustFontSizeTo } from '../utils/typography'

export default function Settings({}: RouteComponentProps) {
  return (
    <div>
      <h2>Settings</h2>
      <AccountCard title="My Profile" id="profile">
        <div className="input-wrap">
          <label htmlFor="profile-name">Name</label>
          <input type="text" id="profile-name" className="input" />
        </div>
        <div className="input-wrap">
          <label htmlFor="profile-email">Email</label>
          <input type="email" id="profile-email" className="input" />
        </div>
      </AccountCard>
      <AccountCard title="API Credentials" id="api" contentCss={styles.apiContent}>
        <h4 css={[styles.credsHeader, { borderTop: 'none' }]}>Live Credentials</h4>
        <h4 css={styles.credsHeader}>Test Credentials</h4>
      </AccountCard>
    </div>
  )
}

const styles = {
  apiContent: css`
    padding: 0;
  `,
  credsHeader: css`
    ${adjustFontSizeTo('18px')};
    font-weight: 400;
    text-transform: uppercase;
    padding: 10px 20px;
    background-color: var(--text-color-dark-bg);
    border-top: 1px solid var(--main-border-color);
    border-bottom: 1px solid var(--main-border-color);
  `
}
