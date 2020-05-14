import { FixedObject } from 'gatsby-image'
import { MarkdownRemark } from './utils/graphql'
import { MutableRefObject } from 'react'

// Added by createPage to templates in gatsby-node.js
export interface PageContext {
  author: TeamMemberName
  currentPage: number
  limit: number
  next: MarkdownRemark
  numPages: number
  related: RelatedLink[]
  previous: MarkdownRemark
  skip: number
  slug: string
  tag: string
  tags: string[]
}

export interface RelatedLink {
  title: string
  href: string
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

interface SharpImage {
  childImageSharp: { fixed: FixedObject }
}

export interface TeamImages {
  brent: SharpImage
  elizabeth: SharpImage
  josh: SharpImage
  mike: SharpImage
  noel: SharpImage
  shelby: SharpImage
  timmy: SharpImage
  will: SharpImage
}

export type TeamMemberName =
  | 'brent'
  | 'elizabeth'
  | 'josh'
  | 'mike'
  | 'noel'
  | 'timmy'
  | 'will'

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
