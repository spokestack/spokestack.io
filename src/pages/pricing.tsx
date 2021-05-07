import * as features from '../utils/pricingFeatures'
import * as theme from '../styles/theme'

import { PageRendererProps, graphql } from 'gatsby'
import React, { useRef, useState } from 'react'

import Layout from '../components/Layout'
import OpenSource from '../components/pricing/OpenSource'
import Plan from '../components/pricing/Plan'
import { Query } from '../utils/graphql'
import ContactUs from '../components/pricing/ContactUs'
import SEO from '../components/SEO'
import SaveBadge from '../components/pricing/SaveBadge'
import Switch from '../components/pricing/Switch'
import { css } from '@emotion/react'
import FAQ from '../components/pricing/FAQ'

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
        description="Choose the right plan for you: Free, Maker, or Enterprise. All plans feature pre-trained models for Wake Word activation, Keyword recognition, Natural Language Understanding, and Text to Speech, as well as free API access to our Automatic Speech Recognition and Text to Speech streaming services."
      />
      <div css={styles.background} />
      <header css={styles.header}>
        <h2>Pricing that Fits Your Software Needs</h2>
        <p className="title">
          Plans for everything, from &ldquo;checking it out&rdquo; to
          &ldquo;build it for me&rdquo;
        </p>
        <Switch yearly={yearly} onChange={(y) => setYearly(y)} />
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
            yearly ? (
              <h3 css={styles.save}>
                <SaveBadge percent={16} />
                $99.99/yr
              </h3>
            ) : (
              '$9.99/mo'
            )
          }
          slug="/account/upgrade"
          description="Entry-level pricing for makers, startups, &amp; personal projects"
          subtext={
            <div>
              Open source contributor? Get a discount as thanks!{' '}
              <a href="">See details</a>
            </div>
          }
          background="#ebf4ff"
          features={features.maker}
        />
        <Plan
          name="Pro"
          cta="Sign up for waitlist"
          imageUrl="/pricing/plan-pro.svg"
          price="TBA"
          slug={`mailto:${contact.email}?subject=Join Pro Waitlist`}
          description="Competitive pricing for production-quality projects"
          subtext="Coming soon!"
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
      <ContactUs />
      <FAQ contact={contact} />
    </Layout>
  )
}

const styles = {
  background: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 450px;
    background: ${theme.header} url(/pricing/wave.png) no-repeat bottom center;
    z-index: -1;

    @media (min-width: 1440px) {
      background-size: 100% 270px;
    }
  `,
  header: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-size: 100% 270px;
    padding: 70px 25px;

    h2,
    .title {
      color: ${theme.textDarkBg};
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
      grid-gap: 25px;
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
