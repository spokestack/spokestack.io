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
  const { contact } = data!.site!.siteMetadata!
  const pricingElem = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      setLoggedIn(isLoggedIn())
    })
  }, [])

  function hover(e: React.PointerEvent<HTMLDivElement>) {
    let elem: HTMLDivElement | null = e.target as HTMLDivElement
    if (!elem || typeof elem.className !== 'string') {
      return
    }
    if (elem.className.indexOf('row-background') > -1) {
      setShowRowBg(!!rowBgY)
      return
    }
    elem = elem.closest('.category-feature')
    if (elem && pricingElem.current) {
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
              name: 'Native platform SDKs',
              features: [
                {
                  enabled: true,
                  name: 'Node'
                },
                {
                  enabled: true,
                  name: 'React Native'
                },
                {
                  enabled: true,
                  name: 'Python'
                },
                {
                  enabled: true,
                  name: 'iOS (Swift, ObjC)'
                },
                {
                  enabled: true,
                  name: 'Android (Java, Kotlin)'
                }
              ]
            },
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: false,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: false,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: false,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: false,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: false,
                  name: 'No-code model training'
                },
                {
                  enabled: false,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: false,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: false,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: false,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: false,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: false,
                  name: 'No-code model training'
                },
                {
                  enabled: false,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Spokestack cloud real-time streaming API',
                  mobileText: '25k requests/month',
                  desktopText: '25k requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party ASR providers'
                },
                {
                  enabled: false,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: false,
                  name: 'Custom vocabulary creation'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Real-time cloud NLU',
                  mobileText: '25k requests/month',
                  desktopText: '25k requests/month'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: '2',
                  desktopText: '2'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to Jovo NLU'
                },
                {
                  enabled: false,
                  name: 'Custom model creation'
                },
                {
                  enabled: false,
                  name: 'No-code model training'
                },
                {
                  enabled: false,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Faster-than-real-time streaming cloud TTS',
                  mobileText: '25k requests/month',
                  desktopText: '25k requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party TTS providers'
                },
                {
                  enabled: true,
                  name:
                    'Pre-trained Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: false,
                  name: 'Full Spokestack library of AI voices'
                },
                {
                  enabled: false,
                  name: 'Personal custom AI voice model creation'
                },
                {
                  enabled: false,
                  name: 'Branded custom AI voice model creation'
                },
                {
                  enabled: false,
                  name: 'Self-service voice data collection'
                },
                {
                  enabled: false,
                  name: 'No-code model training'
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
          subtitle="With 5-day free trial"
          categories={[
            {
              name: 'Native platform SDKs',
              features: [
                {
                  enabled: true,
                  name: 'Node'
                },
                {
                  enabled: true,
                  name: 'React Native'
                },
                {
                  enabled: true,
                  name: 'Python'
                },
                {
                  enabled: true,
                  name: 'iOS (Swift, ObjC)'
                },
                {
                  enabled: true,
                  name: 'Android (Java, Kotlin)'
                }
              ]
            },
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: false,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: true,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: false,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: true,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Spokestack cloud real-time streaming API',
                  mobileText: '1M requests/month',
                  desktopText: '1M requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party ASR providers'
                },
                {
                  enabled: false,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: false,
                  name: 'Custom vocabulary creation'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Real-time cloud NLU',
                  mobileText: '1M requests/month',
                  desktopText: '1M requests/month'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: '5',
                  desktopText: '5'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to Jovo NLU'
                },
                {
                  enabled: true,
                  name: 'Custom model creation'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Faster-than-real-time streaming cloud TTS',
                  mobileText: '1M requests/month',
                  desktopText: '1M requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party TTS providers'
                },
                {
                  enabled: true,
                  name:
                    'Pre-trained Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: false,
                  name: 'Full Spokestack library of AI voices'
                },
                {
                  enabled: true,
                  name: 'Personal custom AI voice model creation'
                },
                {
                  enabled: false,
                  name: 'Branded custom AI voice model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service voice data collection'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
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
          name="Pro"
          cta="Coming Soon"
          slug={`mailto:${contact.email}?subject=Join Pro Waitlist`}
          price="TBA"
          categories={[
            {
              name: 'Native platform SDKs',
              features: [
                {
                  enabled: true,
                  name: 'Node'
                },
                {
                  enabled: true,
                  name: 'React Native'
                },
                {
                  enabled: true,
                  name: 'Python'
                },
                {
                  enabled: true,
                  name: 'iOS (Swift, ObjC)'
                },
                {
                  enabled: true,
                  name: 'Android (Java, Kotlin)'
                }
              ]
            },
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: true,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: true,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: true,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: true,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Spokestack cloud real-time streaming API',
                  mobileText: '10M requests/month',
                  desktopText: '10M requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party ASR providers'
                },
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Custom vocabulary creation'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Real-time cloud NLU',
                  mobileText: '10M requests/month',
                  desktopText: '10M requests/month'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: 'Unlimited',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to Jovo NLU'
                },
                {
                  enabled: true,
                  name: 'Custom model creation'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Faster-than-real-time streaming cloud TTS',
                  mobileText: '1M requests/month',
                  desktopText: '1M requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party TTS providers'
                },
                {
                  enabled: true,
                  name:
                    'Pre-trained Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: true,
                  name: 'Full Spokestack library of AI voices'
                },
                {
                  enabled: true,
                  name: 'Personal custom AI voice model creation'
                },
                {
                  enabled: false,
                  name: 'Branded custom AI voice model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service voice data collection'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
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
          slug={`mailto:${contact!.email}`}
          price="Custom"
          categories={[
            {
              name: 'Native platform SDKs',
              features: [
                {
                  enabled: true,
                  name: 'Node'
                },
                {
                  enabled: true,
                  name: 'React Native'
                },
                {
                  enabled: true,
                  name: 'Python'
                },
                {
                  enabled: true,
                  name: 'iOS (Swift, ObjC)'
                },
                {
                  enabled: true,
                  name: 'Android (Java, Kotlin)'
                }
              ]
            },
            {
              name: 'Wake Word',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: true,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: true,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Keyword Recognition',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Pre-trained universal models'
                },
                {
                  enabled: true,
                  name: 'Custom personal model creation'
                },
                {
                  enabled: true,
                  name: 'Custom universal model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service custom data collection'
                },
                {
                  enabled: true,
                  name: 'Any language (or sound) supported'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Spokestack cloud real-time streaming API',
                  mobileText: '10M requests/month',
                  desktopText: '10M requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party ASR providers'
                },
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Custom vocabulary creation'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Local real-time inference on platform SDKs'
                },
                {
                  enabled: true,
                  name: 'Real-time cloud NLU',
                  mobileText: '10M requests/month',
                  desktopText: '10M requests/month'
                },
                {
                  enabled: true,
                  name: 'Alexa, Dialogflow, & Rasa model imports',
                  mobileText: 'Unlimited',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to Jovo NLU'
                },
                {
                  enabled: true,
                  name: 'Custom model creation'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
                },
                {
                  enabled: true,
                  name: 'Fast global model distribution'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'Faster-than-real-time streaming cloud TTS',
                  mobileText: '1M requests/month',
                  desktopText: '1M requests/month'
                },
                {
                  enabled: true,
                  name: 'Platform SDK access to 3rd-party TTS providers'
                },
                {
                  enabled: true,
                  name:
                    'Pre-trained Spokestack Showcase Hollywood Actor AI Voice'
                },
                {
                  enabled: true,
                  name: 'Full Spokestack library of AI voices'
                },
                {
                  enabled: true,
                  name: 'Personal custom AI voice model creation'
                },
                {
                  enabled: true,
                  name: 'Branded custom AI voice model creation'
                },
                {
                  enabled: true,
                  name: 'Self-service voice data collection'
                },
                {
                  enabled: true,
                  name: 'No-code model training'
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
    left: -48px;
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
