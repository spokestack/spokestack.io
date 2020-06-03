import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import Layout from '../components/Layout'
import Plan from '../components/pricing/Plan'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/core'

export default function Pricing() {
  return (
    <Layout>
      <SEO
        title="Pricing"
        longTitle="Spokestack Pricing"
        description="Choose between the plans available for Spokestack, including Developer (free), Pro, and Enterprise."
      />
      <div css={styles.pricing}>
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
                  enabled: true,
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
          cta="Coming soon"
          name="Pro"
          price="$99/mo"
          categories={[
            {
              name: 'Automatic Speech Recognition (ASR)',
              features: [
                {
                  enabled: true,
                  name: 'Open source ASR management'
                },
                {
                  enabled: true,
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
                  enabled: true,
                  name: 'Custom synthetic voice',
                  // TODO: Require yearly subscription
                  mobileText: '1 custom synthetic voice',
                  desktopText: 'Limited to 1'
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
          cta="Contact us"
          name="Enterprise"
          slug="mailto:hello@spokestack.io"
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
                  enabled: true,
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
      </div>
    </Layout>
  )
}

const styles = {
  pricing: css`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    padding: 75px 20px;

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
  `
}
