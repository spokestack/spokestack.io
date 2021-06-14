import * as theme from '../styles/theme'

import { PageRendererProps, graphql } from 'gatsby'

import IssueList from '../components/community/IssueList'
import { IssueProps } from '../components/community/Issue'
import Layout from '../components/Layout'
import PricingBackground from '../components/pricing/Background'
import { Query } from '../utils/graphql'
import Question from '../components/Question'
import React from 'react'
import SEO from '../components/SEO'
import { StaticImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import startCase from 'lodash/startCase'

interface Props extends PageRendererProps {
  data: Query
}

export default function Contribute({ data }: Props) {
  const issues = data?.github.organization?.repositories?.nodes?.reduce<
    IssueProps[]
  >((all, repo) => {
    const nodes = repo!.issues!.nodes!
    const issue = nodes[0]!
    all.push({
      author: issue.author!.login,
      avatarUrl: issue.author!.avatarUrl,
      id: issue.id!,
      tags: [startCase(repo!.name).replace('Spokestack', '').trim()],
      title: issue.title,
      url: issue.url
    })
    return all
  }, [])
  return (
    <Layout>
      <SEO
        title="Contribute to Spokestack Open Source"
        description="Spokestack is an open source project which thrives from community contributions. There are many different ways to get involved and grow as a contributor in our community."
      />
      <PricingBackground height="590px" />
      <header css={styles.header}>
        <div css={styles.headerContent}>
          <h1>Contribute to Spokestack</h1>
          <p className="title">
            Spokestack is an open source project which thrives from community
            contributions. There are many different ways to get involved and
            grow as a contributor in our community.
          </p>
          <a href="#how-to-contribute" className="btn btn-wide btn-secondary">
            Get Started
          </a>
        </div>
        <IssueList issues={issues} />
      </header>
      <div css={styles.perks}>
        <div css={styles.perk}>
          <StaticImage
            width={241}
            height={225}
            alt="Free swag"
            src="../images/contribute/swag.png"
          />
          <h4>Free swag 😎</h4>
        </div>
        <div css={styles.perk}>
          <StaticImage
            width={241}
            height={225}
            alt="1 year FREE access to Spokestack Maker"
            src="../images/contribute/maker.png"
          />
          <h4>1 year FREE access to Spokestack Maker</h4>
        </div>
        <div css={styles.perk}>
          <StaticImage
            width={241}
            height={225}
            alt="Public recognition on our website and social media channels"
            src="../images/contribute/twitter.png"
          />
          <h4>Public recognition on our website and social media channels</h4>
        </div>
      </div>
      <div id="how-to-contribute" css={styles.howWrapper}>
        <section css={styles.how}>
          <h2>How Do I Contribute to Spokestack?</h2>
          <div css={styles.questions}>
            <Question
              startOpen
              question="Like to write code?"
              answer={
                <ul>
                  <li>
                    Find an open issue on our{' '}
                    <a href="https://github.com/spokestack">GitHub Dashboard</a>
                  </li>
                  <li>
                    <a href="https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-issues">
                      Report a bug
                    </a>{' '}
                    and help us resolve it
                  </li>
                  <li>
                    <a href="https://github.com/spokestack">
                      Open a Feature Request
                    </a>{' '}
                    issue from any Spokestack open source library
                  </li>
                </ul>
              }
            />
            <Question
              startOpen
              question="Love to help others?"
              answer={
                <ul>
                  <li>
                    Answer questions related to{' '}
                    <a href="https://github.com/spokestack">open issues</a>
                  </li>
                  <li>
                    Answer questions on the{' '}
                    <a href="https://forum.spokestack.io">
                      Spokestack Community Forum
                    </a>
                  </li>
                </ul>
              }
            />
            <Question
              startOpen
              question="Writing more your thing?"
              answer={
                <ul>
                  <li>
                    Suggest edits to the <a href="/docs">Spokestack Docs</a> by
                    clicking &ldquo;Edit this doc!&rdquo; located at the bottom
                    of each page
                  </li>
                  <li>
                    Create a blog post about Spokestack and let us know at{' '}
                    <a href="mailto:hello@spokestack.io">hello@spokestack.io</a>
                  </li>
                  <li>
                    Translate the <a href="/docs">Spokestack Docs</a> or
                    community content
                  </li>
                </ul>
              }
            />
            <Question
              startOpen
              question="Prefer to teach or create tutorials?"
              answer={
                <ul>
                  <li>
                    Create a tutorial for Spokestack Open Source or Spokestack
                    Maker
                  </li>
                  <li>Support others on creating a tutorial</li>
                  <li>
                    Don’t forget to share it with us at{' '}
                    <a href="mailto:hello@spokestack.io">hello@spokestack.io</a>
                  </li>
                </ul>
              }
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

const styles = {
  header: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 25px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      padding: 0 30px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }
  `,
  headerContent: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
    max-width: 690px;

    h1,
    .title {
      color: ${theme.textDarkBg};
      margin-bottom: 25px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      text-align: left;
    }
  `,
  perks: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 25px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      align-items: flex-start;
      padding: 100px 100px 0;
    }
  `,
  perk: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 400px;

    &:not(:last-of-type) {
      margin-bottom: 50px;
    }

    h4 {
      font-weight: 400;
      margin: 25px 0 0;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      margin-bottom: 0 !important;
      & + & {
        margin-left: 25px;
      }
    }
  `,
  howWrapper: css`
    padding: 100px 25px;
  `,
  how: css`
    max-width: 1024px;
    margin: 0 auto;

    & > h2 {
      text-align: center;
      margin-bottom: 50px;
    }
  `,
  questions: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    overflow: hidden;
    padding: 0 20px;
  `
}

export const pageQuery = graphql`
  query contributeQuery {
    github {
      organization(login: "spokestack") {
        repositories(
          orderBy: { field: STARGAZERS, direction: DESC }
          first: 3
        ) {
          nodes {
            issues(first: 1, orderBy: { field: UPDATED_AT, direction: DESC }) {
              nodes {
                author {
                  avatarUrl(size: 65)
                  login
                }
                id
                title
                url
              }
            }
            url
            name
          }
        }
      }
    }
  }
`
