import { FixedObject } from 'gatsby-image'
import { MutableRefObject } from 'react'

export type TeamMemberName =
  | 'brent'
  | 'elizabeth'
  | 'josh'
  | 'mike'
  | 'neil'
  | 'noel'
  | 'timmy'
  | 'will'

export interface TeamImages {
  brent: { childImageSharp: { fixed: FixedObject } }
  elizabeth: { childImageSharp: { fixed: FixedObject } }
  josh: { childImageSharp: { fixed: FixedObject } }
  mike: { childImageSharp: { fixed: FixedObject } }
  neil: { childImageSharp: { fixed: FixedObject } }
  noel: { childImageSharp: { fixed: FixedObject } }
  shelby: { childImageSharp: { fixed: FixedObject } }
  timmy: { childImageSharp: { fixed: FixedObject } }
  tyler: { childImageSharp: { fixed: FixedObject } }
  will: { childImageSharp: { fixed: FixedObject } }
}

export interface StickyLink {
  href: string
  title: string
  navId?: string
  section?: string
  forceSelect?: boolean
  ref?: MutableRefObject<HTMLElement>
  refSelector?: string
}

export interface Voice {
  model: string
  label: string
  description: string
}

/**
 * Remote types for the Spokestack API
 */
export interface Account {
  apiKeys: ApiKeySummary[]
  displayName: string
  id: string
  insertedAt: string
}

export interface AccountSummary {
  displayName: string
  id: string
  isInvite: boolean
}

export interface ApiKey {
  displayName: string
  id: string
  insertedAt: number
  key: string
  type: KeyType
}

export interface ApiKeySummary {
  displayName: string
  id: string
  insertedAt: number
  type: KeyType
}

export enum KeyType {
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST'
}
