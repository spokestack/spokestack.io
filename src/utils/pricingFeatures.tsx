import React from 'react'

const FeatureOpenSource = (
  <span>
    All features from <a href="/pricing#open-source">Spokestack Open Source</a>
  </span>
)

const CommunitySupport = <a href="/support">Community support</a>

export const free = [
  FeatureOpenSource,
  '25K cloud requests/mo',
  '2 NLU model imports',
  '1 pre-trained AI voice',
  CommunitySupport
]

export const maker = [
  FeatureOpenSource,
  '1M cloud requests/mo',
  '5 NLU model imports',
  '1 pre-trained AI voice',
  'Custom personal model creation',
  'Self-service data collection',
  'Multilingual + sound support',
  'No-code model training',
  'Fast global model distribution',
  CommunitySupport
]

export const pro = [
  FeatureOpenSource,
  '10M cloud requests/mo',
  'Unlimited NLU model imports',
  'Full library of pre-trained AI voices',
  'Custom personal model creation',
  'Custom universal model creation',
  'Self-service data collection',
  'Multilingual + sound support',
  'No-code model training',
  'Fast global model distribution',
  'Email support'
]

export const enterprise = [
  FeatureOpenSource,
  'Unlimited cloud requests/mo',
  'Unlimited NLU model imports',
  'Full library of pre-trained AI voices',
  'Custom personal model creation',
  'Custom universal model creation',
  'Bring your own data',
  'Custom data curation',
  'Multilingual + sound support',
  'Personalized training',
  'Fast global model distribution',
  'Priority support and access to the Spokestack team',
  'Feature requests',
  'Flexible payment options'
]
