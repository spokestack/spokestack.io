import * as theme from '../styles/theme'

import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { PageRendererProps, graphql } from 'gatsby'
import React, { useRef, useState } from 'react'

import Layout from '../components/Layout'
import Plan from '../components/pricing/Plan'
import PricingRowBackground from '../components/pricing/PricingRowBackground'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'
import SVGIcon from '../components/SVGIcon'
import Switch from '../components/pricing/Switch'
import { adjustFontSizeTo } from '../styles/typography'
import { css } from '@emotion/core'

interface Props extends PageRendererProps {
  data: Query
}

export default function Pricing({ data, location }: Props) {
  const { contact } = data.site.siteMetadata
  const pricingElem = useRef<HTMLDivElement>(null)
  const [yearly, setYearly] = useState(true)
  const [rowBgY, setRowBgY] = useState(0)
  const [showRowBg, setShowRowBg] = useState(false)

  function hover(e: React.PointerEvent<HTMLDivElement>) {
    let elem = e.target as HTMLDivElement
    if (elem.className.indexOf('row-background') > -1) {
      setShowRowBg(!!rowBgY)
      return
    }
    elem = elem && elem.closest('.category-feature')
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
        title="Pricing"
        longTitle="Spokestack Pricing"
        description="Choose between the plans available for Spokestack, including Developer (free), Pro, and Enterprise."
      />
      <div
        className="ie-fix"
        css={styles.pricing}
        ref={pricingElem}
        onPointerMove={hover}>
        <Plan
          showBanners
          cta="Sign up free"
          name="Free"
          price="$0"
          slug="/create"
          categories={[
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Open source ASR management'
                },
                {
                  enabled: false,
                  name: 'Spokestack ASR'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Spokestack cloud NLU'
                },
                {
                  enabled: true,
                  name: 'Spokestack on-device NLU'
                },
                {
                  enabled: true,
                  name: 'Model imports',
                  mobileText: 'Limited to 2 model imports',
                  desktopText: 'Limited to 2'
                },
                {
                  enabled: true,
                  name: 'Model hosting'
                },
                {
                  enabled: false,
                  name: 'Custom dictionary & pronunciation'
                },
                {
                  enabled: false,
                  name: 'Model training'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'TTS requests',
                  mobileText: 'Limited to 25k TTS requests/month',
                  desktopText: 'Limited to 25k requests/month'
                },
                {
                  enabled: true,
                  name: 'Spokestack synthetic voice library'
                },
                {
                  enabled: false,
                  name: 'Custom synthetic voices'
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
          background={theme.primaryLighter}
          cta="Coming soon"
          extraHeader={
            <Switch
              yearly={yearly}
              onChange={(y) => setYearly(y)}
              extraCss={styles.switch}
            />
          }
          name={
            <>
              <div css={styles.saveBadge} style={{ opacity: yearly ? 1 : 0 }}>
                <SVGIcon icon="#star" extraCss={styles.starIcon} />
                <strong>-15%</strong>
              </div>
              <span>Pro</span>
            </>
          }
          price={yearly ? '$84/mo' : '$99/mo'}
          categories={[
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Open source ASR management'
                },
                {
                  enabled: false,
                  showDisabled: true,
                  name: 'Spokestack ASR',
                  desktopText: 'Coming soon',
                  mobileText: 'Spokestack ASR coming soon'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Spokestack cloud NLU'
                },
                {
                  enabled: true,
                  name: 'Spokestack on-device NLU',
                  mobileText:
                    'Continual Spokestack on-device NLU model updates',
                  desktopText: 'Continual model updates'
                },
                {
                  enabled: true,
                  name: 'Model import',
                  mobileText: 'Unlimited model imports',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: true,
                  name: 'Model hosting'
                },
                {
                  enabled: true,
                  name: 'Custom dictionary & pronunciation',
                  desktopText: 'Custom development'
                },
                {
                  enabled: false,
                  name: 'Model training'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'TTS requests',
                  mobileText: 'Limited to 1M TTS requests/month',
                  desktopText: 'Limited to 1M requests/month'
                },
                {
                  enabled: true,
                  name: 'Spokestack synthetic voice library'
                },
                {
                  enabled: yearly,
                  showDisabled: true,
                  name: 'Custom synthetic voice',
                  mobileText: yearly ? (
                    '1 custom synthetic voice'
                  ) : (
                    <span className="error">
                      Yearly subscription required for custom synthetic voices
                    </span>
                  ),
                  desktopText: yearly ? (
                    'Limited to 1'
                  ) : (
                    <span className="error">Yearly subscription required</span>
                  )
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
          background={theme.primaryLight}
          cta="Contact us"
          name="Enterprise"
          slug={`mailto:${contact.email}`}
          price="Custom"
          categories={[
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Open source ASR management'
                },
                {
                  enabled: false,
                  showDisabled: true,
                  name: 'Spokestack ASR',
                  desktopText: 'Coming soon',
                  mobileText: 'Spokestack ASR coming soon'
                }
              ]
            },
            {
              name: 'Natural Language Understanding (NLU)',
              features: [
                {
                  enabled: true,
                  name: 'Spokestack cloud NLU'
                },
                {
                  enabled: true,
                  name: 'Spokestack on-device NLU',
                  mobileText: 'Custom model development for on-device NLU',
                  desktopText: 'Custom model development'
                },
                {
                  enabled: true,
                  name: 'Model import',
                  mobileText: 'Unlimited model imports',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: true,
                  name: 'Model hosting'
                },
                {
                  enabled: true,
                  name: 'Custom dictionary & pronunciation',
                  desktopText: 'Custom development'
                },
                {
                  enabled: true,
                  name: 'Model training',
                  mobileText: 'Unlimited model training',
                  desktopText: 'Unlimited'
                }
              ]
            },
            {
              name: 'Text-to-speech (TTS)',
              features: [
                {
                  enabled: true,
                  name: 'TTS requests',
                  mobileText: 'Unlimited TTS requests',
                  desktopText: 'Unlimited'
                },
                {
                  enabled: true,
                  name: 'Spokestack synthetic voice library'
                },
                {
                  enabled: true,
                  name: 'Custom synthetic voices',
                  mobileText: 'Unlimited custom synthetic voices',
                  desktopText: 'Unlimited'
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

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: center;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 25px;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      grid-template-columns: 186px 186px 186px;
    }
  `,
  saveBadge: css`
    position: absolute;
    top: -4px;
    left: -53px;
    width: 41px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: opacity 0.2s ${theme.transitionEasing};

    strong {
      font-size: ${adjustFontSizeTo('11px').fontSize};
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
