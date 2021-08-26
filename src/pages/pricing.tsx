import * as features from '../utils/pricingFeatures'
import * as theme from '../styles/theme'

import { PageRendererProps, graphql } from 'gatsby'
import React, { Fragment, useRef, useState } from 'react'

import Background from '../components/pricing/Background'
import Create from '../components/Create'
import FAQ from '../components/pricing/FAQ'
import Layout from '../components/Layout'
import OpenSource from '../components/pricing/OpenSource'
import Plan from '../components/pricing/Plan'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'
import SaveBadge from '../components/pricing/SaveBadge'
import Switch from '../components/pricing/Switch'
import { css } from '@emotion/react'

interface Props extends PageRendererProps {
  data: Query
}

export default function Pricing({ data }: Props) {
  const [yearly, setYearly] = useState(true)
  const contact = data.site!.siteMetadata!.contact!
  const pricingElem = useRef<HTMLDivElement>(null)

  return (
    <Layout>
      <SEO
        title="Pricing | Spokestack"
        description="Choose the right plan for you: Free, Maker, Pro, or Enterprise. All plans feature pre-trained models for Wake Word activation, Keyword recognition, Natural Language Understanding, and Text to Speech, as well as free API access to our Automatic Speech Recognition and Text to Speech streaming services."
      />
      <Background height="450px" />
      <header css={styles.header}>
        <h2>Pricing that Fits Your Software Needs</h2>
        <p className="title">
          Plans for everything, from &ldquo;checking it out&rdquo; to
          &ldquo;build it for me&rdquo;
        </p>
      </header>
      <div className="ie-fix" css={styles.plans} ref={pricingElem}>
        <Plan
          name="Free"
          cta="Get started free"
          imageUrl="/pricing/plan-free.svg"
          price="$0"
          slug="/account/create"
          description="Free for evaluation &amp; basic use"
          features={features.free}
        />
        <Plan
          highlight
          name="Maker"
          cta="Start 5-day free trial"
          imageUrl="/pricing/plan-maker.svg"
          price={
            <Fragment>
              <h3 css={styles.save}>
                {yearly ? (
                  <Fragment>
                    <SaveBadge percent={16} />
                    $99.99/yr
                  </Fragment>
                ) : (
                  '$9.99/mo'
                )}
              </h3>
              <Switch yearly={yearly} onChange={(y) => setYearly(y)} />
            </Fragment>
          }
          slug="/account/upgrade"
          description="Entry-level pricing for makers, startups, &amp; personal projects"
          subtext={
            <div>
              Contribute to our open source projects?{' '}
              <a href="mailto:hello@spokestack.io?subject=Open Source Contributor Discount Request">
                Request a discount!
              </a>
            </div>
          }
          background="#ebf4ff"
          features={features.maker}
        />
        <Plan
          name="Pro"
          cta="Sign up"
          imageUrl="/pricing/plan-pro.svg"
          price="$2388/yr"
          slug="/account/upgrade"
          subtext={
            <div>
              Only available as yearly due to the cost of sample collection.
            </div>
          }
          description="Competitive pricing for production-quality projects"
          background="#c2dfff"
          features={features.pro}
        />
        <Plan
          name="Enterprise"
          cta="Email us"
          imageUrl="/pricing/plan-enterprise.svg"
          price="Custom"
          slug={`mailto:${contact.email}?subject=Enterprise query`}
          description="Bespoke model curation + volume discounts tailored to your needs"
          background={theme.primaryLight}
          features={features.enterprise}
        />
      </div>
      <OpenSource />
      <Create hidePricing />
      <FAQ contact={contact} />
    </Layout>
  )
}

const styles = {
  header: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    padding: 70px 25px;

    h2,
    .title {
      color: ${theme.textDarkBg};
      margin: 0;
    }

    h2 {
      margin-bottom: 25px;
    }
  `,
  plans: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 50px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: center;
      align-items: stretch;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 25px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      grid-template-columns: 245px 245px 245px 245px;
    }
  `,
  save: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30px;
    height: 60px;
    margin: 0 0 20px;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      font-size: 32px;
    }
  `
}

export const pageQuery = graphql`
  query pricingQuery {
    site {
      siteMetadata {
        contact {
          email
        }
      }
    }
  }
`
