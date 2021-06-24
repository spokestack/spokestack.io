import * as theme from '../styles/theme'

import { PageRendererProps, graphql } from 'gatsby'

import BlueCard from '../components/BlueCard'
import GitHub from '../components/community/GitHub'
import IssueList from '../components/community/IssueList'
import Layout from '../components/Layout'
import PricingBackground from '../components/pricing/Background'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import Twitter from '../components/community/Twitter'
import YouTube from '../components/community/YouTube'
import { css } from '@emotion/react'

interface Props extends PageRendererProps {
  data: Query
}

export default function Community({ data }: Props) {
  return (
    <Layout>
      <SEO
        title="Find Other Makers and Developers | Spokestack"
        description="We're a diverse group of makers and developers where people help each other create better voice-enabled software."
      />
      <PricingBackground height="590px" />
      <header css={styles.header}>
        <div css={styles.headerContent}>
          <h1>Spokestack Community</h1>
          <p className="title">
            We&apos;re a diverse group of makers and developers where people
            help each other create better voice-enabled software.
          </p>
          <div css={styles.buttons}>
            <a href="/contribute" className="btn btn-wide btn-secondary">
              Become a Contributor
            </a>
            <a
              href="https://forum.spokestack.io"
              className="btn btn-wide btn-secondary btn-transparent">
              Join the Forum
            </a>
          </div>
        </div>
        <IssueList
          issues={data?.allFeedSpokestackForum.edges.map((edge) => ({
            author: edge.node.creator!,
            id: edge.node.id!,
            tags: edge.node.categories!.filter(Boolean) as string[],
            title: edge.node.title!,
            url: edge.node.link!
          }))}
        />
      </header>
      <GitHub />
      <YouTube />
      <Twitter />
      <BlueCard
        title="Contribute to Spokestack"
        text="Spokestack is an open source project which thrives from community contributions. There are many different ways to get involved and grow as a contributor in our community.">
        <a href="/contribute" className="btn">
          Become a Contributor
        </a>
      </BlueCard>
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
      padding: 30px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }
  `,
  headerContent: css`
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
  buttons: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn + .btn {
      margin-top: 25px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;

      .btn + .btn {
        margin: 0 0 0 25px;
      }
    }
  `
}

export const pageQuery = graphql`
  query communityQuery {
    allFeedSpokestackForum(
      limit: 3
      filter: { categories: { ne: "Announcements" } }
    ) {
      edges {
        node {
          categories
          creator
          id
          link
          title
        }
      }
    }
  }
`
