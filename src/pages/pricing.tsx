import * as theme from '../styles/theme'

import { PageRendererProps, graphql } from 'gatsby'
import React, { Fragment, useEffect, useRef, useState } from 'react'

import Layout from '../components/Layout'
import Plan from '../components/pricing/Plan'
import PricingRowBackground from '../components/pricing/PricingRowBackground'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'
import SVGIcon from '../components/SVGIcon'
import Switch from '../components/pricing/Switch'
import { css } from '@emotion/react'
import { isLoggedIn } from '../utils/auth'

interface Props extends PageRendererProps {
  data: Query
}

export default function Pricing({ data, location }: Props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [yearly, setYearly] = useState(true)
  const [rowBgY, setRowBgY] = useState(0)
  const [showRowBg, setShowRowBg] = useState(false)
  const { contact } = data.site.siteMetadata
  const pricingElem = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      setLoggedIn(isLoggedIn())
    })
  }, [])

  function hover(e: React.PointerEvent<HTMLDivElement>) {
    let elem = e.target as HTMLDivElement
    if (!elem || typeof elem.className !== 'string') {
      return
    }
    if (elem.className.indexOf('row-background') > -1) {
      setShowRowBg(!!rowBgY)
      return
    }
    elem = elem.closest('.category-feature')
    if (elem) {
      const y =
        elem.getBoundingClientRect().top +
        window.pageYOffset -
        pricingElem.current.offsetTop
      setRowBgY(y)
    }
    setShowRowBg(!!elem)
  }

  return (
    <Layout location={location}>
      <SEO
        title="Pricing | Spokestack"
        description="Choose the right plan for you: Free, Maker, or Enterprise. All plans feature pre-trained models for Wake Word activation, Keyword recognition, Natural Language Understanding, and Text to Speech, as well as free API access to our Automatic Speech Recognition and Text to Speech streaming services."
      />
      <div
        className="ie-fix"
        css={styles.pricing}
        ref={pricingElem}
        onPointerMove={hover}>
        <Plan
          showBanners
          cta="Create account"
          name="Free"
          price="$0"
          slug="/account/create"
          categories={[
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: false,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: false,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: false,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: false,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming ASR API',
                  mobileText: '25k requests/mo',
                  desktopText: '25k requests/mo'
                },
                {
                  enabled: false,
                  name: 'Custom vocabulary, on-device, real-time streaming ASR'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time NLU API',
                  mobileText: '25k requests/mo',
                  desktopText: '25k requests/mo'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: '2',
                  desktopText: '2'
                },
                {
                  enabled: false,
                  name: 'Custom model creation, training, and distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming TTS API',
                  mobileText: '25k requests/month',
                  desktopText: '25k requests/month'
                },
                {
                  enabled: true,
                  name: 'Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: false,
                  name: 'Personal custom AI voice models'
                },
                {
                  enabled: false,
                  name:
                    'Universal custom AI voice model creation, data collection, training, and distribution'
                },
                {
                  enabled: false,
                  name:
                    'Branded custom AI voice model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Support & training',
              features: [
                {
                  enabled: true,
                  name: 'Community support'
                },
                {
                  enabled: false,
                  name: 'Email support'
                },
                {
                  enabled: false,
                  name: 'Enterprise support & training'
                }
              ]
            }
          ]}
        />
        <Plan
          cta={loggedIn ? 'Upgrade' : 'Create account'}
          slug={loggedIn ? '/account/upgrade' : '/account/create'}
          background={theme.primaryLighter}
          extraHeader={
            <Switch
              yearly={yearly}
              onChange={(y) => setYearly(y)}
              extraCss={styles.switch}
            />
          }
          name={
            <Fragment>
              <div css={styles.saveBadge} style={{ opacity: yearly ? 1 : 0 }}>
                <SVGIcon icon="#star" extraCss={styles.starIcon} />
                <strong>-16%</strong>
              </div>
              <span>Maker</span>
            </Fragment>
          }
          price={yearly ? '$99.99/yr' : '$9.99/mo'}
          categories={[
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: false,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: false,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming ASR API',
                  mobileText: '1M requests/mo',
                  desktopText: '1M requests/mo'
                },
                {
                  enabled: false,
                  name: 'Custom vocabulary, on-device, real-time streaming ASR'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time NLU API',
                  mobileText: '1M requests/mo',
                  desktopText: '1M requests/mo'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: 'Unlimited',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: false,
                  name: 'Custom model creation, training, and distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming TTS API',
                  mobileText: '1M requests/month',
                  desktopText: '1M requests/month'
                },
                {
                  enabled: true,
                  name: 'Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: true,
                  name: 'Personal custom AI voice models'
                },
                {
                  enabled: false,
                  name:
                    'Universal custom AI voice model creation, data collection, training, and distribution'
                },
                {
                  enabled: false,
                  name:
                    'Branded custom AI voice model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Support & training',
              features: [
                {
                  enabled: true,
                  name: 'Community support'
                },
                {
                  enabled: false,
                  name: 'Email support'
                },
                {
                  enabled: false,
                  name: 'Enterprise support & training'
                }
              ]
            }
          ]}
        />
        <Plan
          background={theme.primaryLight}
          name="Pro (coming soon)"
          cta="Join the Waitlist"
          slug={`mailto:${contact.email}?subject=Join Pro Waitlist`}
          price="TBA"
          categories={[
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming ASR API',
                  mobileText: '10M requests/mo',
                  desktopText: '10M requests/mo'
                },
                {
                  enabled: false,
                  name: 'Custom vocabulary, on-device, real-time streaming ASR'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time NLU API',
                  mobileText: '10M requests/mo',
                  desktopText: '10M requests/mo'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: 'Unlimited',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: false,
                  name: 'Custom model creation, training, and distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming TTS API',
                  mobileText: '10M requests/month',
                  desktopText: '10M requests/month'
                },
                {
                  enabled: true,
                  name: 'Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: true,
                  name: 'Personal custom AI voice models'
                },
                {
                  enabled: true,
                  name:
                    'Universal custom AI voice model creation, data collection, training, and distribution'
                },
                {
                  enabled: false,
                  name:
                    'Branded custom AI voice model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Support & training',
              features: [
                {
                  enabled: true,
                  name: 'Community support'
                },
                {
                  enabled: true,
                  name: 'Email support'
                },
                {
                  enabled: false,
                  name: 'Enterprise support & training'
                }
              ]
            }
          ]}
        />
        <Plan
          background={theme.primaryDark}
          name="Enterprise"
          cta="Email us"
          slug={`mailto:${contact.email}`}
          price="Custom"
          categories={[
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual personal model creation, data collection, training, and distribution'
                },
                {
                  enabled: true,
                  name:
                    'No-code multilingual universal model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming ASR API',
                  mobileText: 'Unlimited requests/mo',
                  desktopText: 'Unlimited requests/mo'
                },
                {
                  enabled: true,
                  name: 'Custom vocabulary, on-device, real-time streaming ASR'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time NLU API',
                  mobileText: 'Unlimited requests/mo',
                  desktopText: 'Unlimited requests/mo'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: 'Unlimited',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: true,
                  name: 'Custom model creation, training, and distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Cross-platform native SDKs'
                },
                {
                  enabled: true,
                  name: 'Spokestack real-time streaming TTS API',
                  mobileText: 'Unlimited requests/month',
                  desktopText: 'Unlimited requests/month'
                },
                {
                  enabled: true,
                  name: 'Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: true,
                  name: 'Personal custom AI voice models'
                },
                {
                  enabled: true,
                  name:
                    'Universal custom AI voice model creation, data collection, training, and distribution'
                },
                {
                  enabled: true,
                  name:
                    'Branded custom AI voice model creation, data collection, training, and distribution'
                }
              ]
            },
            {
              name: 'Support & training',
              features: [
                {
                  enabled: true,
                  name: 'Community support'
                },
                {
                  enabled: true,
                  name: 'Email support'
                },
                {
                  enabled: true,
                  name: 'Enterprise support & training'
                }
              ]
            }
          ]}
        />
        <PricingRowBackground show={showRowBg} y={rowBgY} />
      </div>
    </Layout>
  )
}

const styles = {
  pricing: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    padding: 0 20px 75px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: center;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 25px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      grid-template-columns: 186px 186px 186px;
    }
  `,
  saveBadge: css`
    position: absolute;
    top: -4px;
    left: -50px;
    width: 41px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: opacity 0.2s ${theme.transitionEasing};

    strong {
      font-size: 11px;
      position: relative;
      color: ${theme.header};
    }
  `,
  starIcon: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 41px;
    height: 41px;
  `,
  switch: css`
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
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
